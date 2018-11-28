import React, {Component} from 'react'
import BuyForm from './BuyForm'
import axios from 'axios'
import { runInNewContext } from 'vm';

class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0,
      funds: 500000,
      currentValue: 328476,
      porfolio: [
        {
          id: 1, name: 'TRX', quantity: 4, price: 432
        },{
          id: 2, name: 'SDK', quantity: 5, price: 3413
        }
        ],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
  }

  async componentDidMount() {
    const userData = await axios.get(`/api/users/${this.props.userInfo.userId}`)
    this.setState({
      userId: this.props.userInfo.userId
    })

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
        symbol: symbol,
        quantity: quantity,
        price: price*100,
        userId: this.state.userId,
        funds: this.state.funds
      }
      console.log(purchase)
      const sale = await axios.post('/api/sales', purchase)
    } catch (error) {
      alert('Invalid symbol!')
      next(error)
    }
  }

  render() {
    return (
      <div className='portfolio-container' style={{display: 'flex', textAlign: 'center'}}>
        <div className='portfolio-view' style={{flex: 1}}>
          <h2>Portfolio Value: ${this.state.currentValue}</h2>
          {this.state.porfolio.map(stock => {
            return <p key={stock.id}>{stock.name} - {stock.quantity} shares - ${(stock.price*stock.quantity / 100).toFixed(2)}</p>
          })}
        </div>
        <div className='buy-view' style={{flex: 1}}>
          <BuyForm handleBuy={this.handleBuy}/>
        </div>
      </div>
    )
  }
}

export default Portfolio

