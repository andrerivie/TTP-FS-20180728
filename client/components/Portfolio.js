import React, {Component} from 'react'
import BuyForm from './BuyForm'
import axios from 'axios'

class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0,
      funds: 0,
      currentValue: 0,
      portfolio: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
  }

  async componentDidMount() {
    const userId = this.props.userInfo.userId
    const userData = await axios.get(`/api/users/${userId}`)
    const {funds} = userData.data
    const portfolioData = await axios.get(`/api/sales/${userId}/portfolio`)
    const portfolio = portfolioData.data
    if (!portfolio.empty) {
      let currentValue = 0
      portfolio.forEach(item => {
        currentValue += item.price * item.quantity
      })
      this.setState({
        userId, funds, portfolio, currentValue
      })
    } else {
      this.setState({
        userId, funds
      })
    }
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleBuy (e, buy) {
    try {
      e.preventDefault()
      const {quantity, symbol} = buy
      const response = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`)
      const price = response.data
      const purchase = {
        symbol: symbol.toUpperCase(),
        quantity: quantity,
        price: price*100,
        userId: this.state.userId,
        funds: this.state.funds
      }
      const sale = await axios.post('/api/sales', purchase)
      if (sale.data.error) {
        alert(sale.data.error)
      } else {
        // refresh data
        const newFunds = sale.data.newFunds
        const portfolioData = await axios.get(`/api/sales/${this.state.userId}/portfolio`)
        const portfolio = portfolioData.data
        let currentValue = 0
        portfolio.forEach(item => {
          currentValue += item.price * item.quantity
        })
        this.setState({
          funds: newFunds, portfolio, currentValue
        })
      }
    } catch (error) {
      alert('Invalid symbol or quantity!')
      console.error(error)
    }
  }

  render() {
    if (this.state.userId === 0) {
      return (
        <div className='loading' style={{textAlign: 'center'}}>
          <h2>Loading real-time data...</h2>
        </div>
      )
    } else {
      return (
        <div className='portfolio-container' style={{display: 'flex', textAlign: 'center'}}>
          <div className='portfolio-view' style={{flex: 1}}>
            <h2>Portfolio Value: ${this.state.currentValue.toFixed(2)}</h2>
            {this.state.portfolio.map((stock, idx) => {
              return (
              <p key={idx}>
              <font color={stock.color}>{stock.symbol.toUpperCase()} </font>
              - {stock.quantity} shares @
              <font color={stock.color}> ${stock.price.toFixed(2) + ' '}
                (${(stock.price*stock.quantity).toFixed(2)})</font>
              </p>
            )})}
          </div>
          <div className='buy-view' style={{flex: 1}}>
            <h2>Cash: ${(this.state.funds/100).toFixed(2)}</h2>
            <BuyForm handleBuy={this.handleBuy} buttonRef={this.buttonRef}/>
          </div>
        </div>
      )
    }
  }
}

export default Portfolio

