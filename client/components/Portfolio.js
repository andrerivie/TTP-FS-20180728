import React, {Component} from 'react'

class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      funds: 0,
      currentValue: 328476,
      porfolio: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <div className='portfolio-container' style={{display: 'flex', textAlign: 'center'}}>
        <div className='portfolio-view' style={{flex: 1}}>
          <h2>Portfolio Value: ${this.state.currentValue}</h2>
        </div>
        <div className='buy-view' style={{flex: 1}}>
          <h2>Funds: ${this.state.funds}</h2>
        </div>
      </div>
    )
  }
}

export default Portfolio

