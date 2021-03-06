import React, { Component } from 'react';

class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      quantity: '',
      price: 0,
      cash: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonRef = React.createRef();
    this.symbolRef = React.createRef();
    this.disableButton = this.disableButton.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  disableButton() {
    this.buttonRef.current.setAttribute('disabled', 'disabled');
    this.buttonRef.current.setAttribute('style', 'color:grey');
    this.buttonRef.current.innerText = 'Buying...';
    setTimeout(() => {
      this.buttonRef.current.removeAttribute('disabled');
      this.buttonRef.current.setAttribute('style', 'color:black');
      this.buttonRef.current.innerText = 'Buy';
      this.symbolRef.current.focus();
      this.setState({
        symbol: '',
        quantity: '',
        price: 0
      });
    }, 1000);
  }

  render() {
    const { handleBuy } = this.props;
    return (
      <div className="buy-form">
        <form
          onSubmit={e => {
            this.disableButton();
            handleBuy(e, this.state);
          }}
        >
          <label htmlFor="symbol">Symbol: </label>
          <input
            type="text"
            name="symbol"
            ref={this.symbolRef}
            value={this.state.symbol}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit" ref={this.buttonRef}>
            Buy
          </button>
        </form>
      </div>
    );
  }
}

export default BuyForm;
