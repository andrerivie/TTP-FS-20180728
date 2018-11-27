import React, {Component} from 'react'
import BuyForm from './BuyForm'
import axios from 'axios'

class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: 0,
      funds: 0,
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
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userInfo.userId
    })

  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleBuy (evt) {

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
          <BuyForm />
        </div>
      </div>
    )
  }
}

export default Portfolio

