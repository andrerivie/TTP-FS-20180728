const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    res.send('Welcome to users api!')
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
