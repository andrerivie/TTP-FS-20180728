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
    const {id, funds} = userData.data
    this.setState({
      userId: id,
      funds: funds
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
      const sale = await axios.post('/api/sales', purchase)
      if (sale.data.error) {
        alert(sale.data.error)
      } else {
        const newFunds = sale.data.newFunds
        this.setState({
          funds: newFunds
        })
      }
    } catch (error) {
      alert('Invalid buy order!')
      console.error(error)
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
          <h2>Cash: ${(this.state.funds/100).toFixed(2)}</h2>
          <BuyForm handleBuy={this.handleBuy}/>
        </div>
      </div>
    )
  }
}

export default Portfolio

