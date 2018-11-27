import React, {Component} from 'react'

class CreateAccountForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const { switchToCreate, handleCreate } = this.props
    return (
      <div className='form'>
        <form onSubmit={this.handleSubmit}>
        <h2>Create an Account!</h2>
        <label htmlFor='name'>Name: </label>
          <input type='text' name='name'
            value={this.state.name}
            onChange={this.handleChange}
            />
            <br/>
        <label htmlFor='email'>Email: </label>
          <input type='text' name='email'
          value={this.state.email}
          onChange={this.handleChange}
          />
          <br/>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password'
          value={this.state.password}
          onChange={this.handleChange}
          />
          <br/>
          <button type='button' onClick={() => handleCreate(this.state)} >Create Account</button>
          </form>
          </div>
    )
  }
}

export default CreateAccountForm

