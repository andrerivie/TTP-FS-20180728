import React, {Component} from 'react'

class BuyForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      symbol: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const { handleCreate } = this.props
    return (
      <div className='form'>
        <form onSubmit={(e) => {
          handleCreate(e, this.state)
        }}>
          <label htmlFor='symbol'>Symbol: </label>
            <input type='text' name='symbol'
              value={this.state.symbol}
              onChange={this.handleChange}
            />
          <br/>
          <label htmlFor='quantity'>Quantity: </label>
            <input type='text' name='quantity'
            value={this.state.quantity}
            onChange={this.handleChange}
            />
          <br/>
          <button type='submit'>Buy</button>
        </form>
      </div>
    )
  }
}

export default BuyForm

