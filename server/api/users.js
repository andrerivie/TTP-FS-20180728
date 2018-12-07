const router = require('express').Router();
const { User } = require('../db/db');

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const userData = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      funds: user.dataValues.funds
    };
    res.send(userData);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const input = {
      email: req.body.email,
      password: req.body.password
    };
    const user = await User.findOne({
      where: {
        email: input.email,
        password: input.password
      }
    });
    if (!user) {
      res.send({ error: 'User not found!' });
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    };
    const response = await User.create(newUser);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
