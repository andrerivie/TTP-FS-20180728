import React, {Component} from 'react'

class LoginForm extends Component {
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
    const { switchToCreate } = this.props
    return (
      <div className='form'>
          <form onSubmit={this.handleSubmit}>
            <h2>Enter Credentials or Create an Account Below</h2>
            <label htmlFor='email'>Email: </label>
              <input type='text' name='email'
            value={this.state.name}
            onChange={this.handleChange}
            />
            <br/>
        <label htmlFor='password'>Password: </label>
          <input type='password' name='password'
          value={this.state.password}
          onChange={this.handleChange}
          />
          <br/>
        <button type='submit' >Login</button>
        <button onClick={switchToCreate}>Create An Account</button>
      </form>
    </div>
    )
  }
}

export default LoginForm
