const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/stockapp', {logging: false})

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  funds: {
    type: Sequelize.INTEGER,
    defaultValue: 500000
  }
})

const Sale = db.define('sales', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

User.hasMany(Sale)

module.exports = {
  db,
  User,
  Sale
}

