const router = require('express').Router()
const {User} = require('../db/db')

router.post('/', async (req, res, next) => {
  try {
    const newUser = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }
    const response = await User.create(newUser);
    res.json(response);
  } catch (error) {
    next(error)
  }
})

module.exports = router
