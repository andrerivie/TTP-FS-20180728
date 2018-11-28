const router = require('express').Router()
const {User, Sale} = require('../db/db')

router.post('/', async (req, res, next) => {
  try {
    const {userId, symbol, quantity, price, funds} = req.body
    const newFunds = funds - (quantity*price)
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
  console.log('SALE', sale)
  console.log('UPDATEDUSER', updatedUser)

  } catch (error) {
    next(error)
  }
})

module.exports = router
