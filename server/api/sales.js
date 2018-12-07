const router = require('express').Router();
const { User, Sale } = require('../db/db');
const axios = require('axios');

router.get('/:userId', async (req, res, next) => {
  try {
    const transactions = await Sale.findAll({
      where: {
        userId: req.params.userId
      }
    });
    const transactionsClean = transactions.map(transaction => {
      return transaction.dataValues;
    });
    res.json(transactionsClean);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/portfolio', async (req, res, next) => {
  try {
    const transactionData = await Sale.findAll({
      where: {
        userId: req.params.userId
      }
    });
    const transactions = transactionData.map(transaction => {
      return transaction.dataValues;
    });
    if (transactions.length) {
      // set up an array with all owned stock symbols and another array
      // with combined purchase quantities (at same index)
      // to cover cases when multiple buy orders were placed for the same
      // stock symbol
      let symArr = [];
      let quantArr = [];
      transactions.forEach(item => {
        const idx = symArr.indexOf(item.symbol);
        if (idx === -1) {
          symArr.push(item.symbol);
          quantArr.push(item.quantity);
        } else {
          quantArr[idx] += item.quantity;
        }
      });
      const response = await axios.get(
        `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symArr.join(
          ','
        )}&types=quote&filter=symbol,open,latestPrice`
      );
      const iexData = response.data;
      // combine above arrays and iex api data in a portfolio object
      const portfolio = symArr.map((sym, idx) => {
        let color = '';
        if (iexData[sym].quote.latestPrice > iexData[sym].quote.open) {
          color = 'green';
        } else if (iexData[sym].quote.latestPrice < iexData[sym].quote.open) {
          color = 'red';
        } else {
          color = 'grey';
        }
        return {
          symbol: sym,
          quantity: quantArr[idx],
          price: iexData[sym].quote.latestPrice,
          open: iexData[sym].quote.open,
          color: color
        };
      });
      res.send(portfolio);
    } else {
      res.send({ empty: 'Portfolio empty!' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, symbol, quantity, price, funds } = req.body;
    const newFunds = funds - quantity * price;
    if (newFunds < 0) {
      res.send({ error: 'Not enough funds!' });
    } else {
      const sale = await Sale.create({
        userId,
        symbol,
        quantity,
        price
      });
      const [number, updatedUser] = await User.update(
        {
          funds: newFunds
        },
        {
          where: { id: userId },
          returning: true,
          plain: true
        }
      );
      res.send({ newFunds });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
