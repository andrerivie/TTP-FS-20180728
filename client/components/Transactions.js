import React, { Component } from 'react';
import axios from 'axios';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    const transactions = await axios.get(
      `/api/sales/${this.props.userInfo.userId}`
    );
    this.setState({
      transactions: transactions.data
    });
  }

  render() {
    const transactions = this.state.transactions;
    return (
      <div className="transactions-container" style={{ textAlign: 'center' }}>
        <h2>Transactions</h2>
        {transactions.map(sale => {
          return (
            <p key={sale.id}>
              BUY ({sale.symbol.toUpperCase()}) - {sale.quantity} share(s) @ $
              {(sale.price / 100).toFixed(2)}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Transactions;
