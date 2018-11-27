import React, {Component} from 'react'

class Transactions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactions: [
        {
          id: 1,
          type: 'BUY',
          stock: 'AAPL',
          quantity: 40,
          cost: 234
        }, {
          id: 2,
          type: 'SELL',
          stock: 'ASLI',
          quantity: 21,
          cost: 21
        }, {
          id: 3,
          type: 'SELL',
          stock: 'TER',
          quantity: 2,
          cost: 1235
      }]
    }
  }

  componentDidMount() {

  }

  render() {
    const transactions = this.state.transactions
    return (
      <div className='transactions-container'>
          <h2>Transactions</h2>
          {transactions.map(sale => {
            return <p key={sale.id}>{sale.type} - {sale.stock} shares @ ${(sale.price/100).toFixed(2)}</p>
          })}
      </div>
    )
  }
}

export default Transactions

