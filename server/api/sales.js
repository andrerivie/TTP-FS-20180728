const router = require('express').Router()
const {User, Sale} = require('../db/db')

router.get('/:userId', async (req, res, next) => {
  try {
    const transactions = await Sale.findAll({
      where: {
        userId: req.params.userId
      }
    })
    const transactionsClean = transactions.map(transaction => {
      return transaction.dataValues
    })
    res.json(transactionsClean)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {userId, symbol, quantity, price, funds} = req.body
    const newFunds = funds - (quantity*price)
    if (newFunds < 0) {
      res.send({error: 'Not enough funds!'})
    } else {
      const sale = await Sale.create({
        userId, symbol, quantity, price
      })
      const [number, updatedUser] = await User.update({
        funds: newFunds,
      }, {
        where: {id: userId},
        returning: true,
        plain: true
      })
      res.send({newFunds})
  }
  } catch (error) {
    next(error)
  }
})



module.exports = router
