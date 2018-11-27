import React, {Component} from 'react'
import Login from './Login';
import Navbar from './Navbar'
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      userId: '',
      history: [],
      create: false,
      funds: 0,
      name: '',
    }
    this.switchToCreate = this.switchToCreate.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  switchToCreate(e) {
    e.preventDefault()
    this.setState({
      create: true
    })
  }

  async handleLogin(data) {
    try {
      const response = await axios.post('/api/users/login', data)
      if (response.data.error) {
        alert(response.data.error)
      } else {
        this.setState({
          userId: response.data.id,
          name: response.data.name,
          funds: response.data.funds,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async handleCreate(data) {
    try {
    const response = await axios.post('/api/users', data)
    this.setState({
      userId: response.data.id,
      name: response.data.name,
      funds: response.data.funds,
      create: false
    })
    }
    catch (error) {
      console.error(error)
      alert('Invalid Account Details!', error)
    }
  }

  render() {
    const userId = this.state.userId
    console.log(this.state)
    return (
      <div id='app-container' style={{padding: '12px'}}>
      <Navbar />
      {
        userId
        ? <h3>Logged In! Welcome, {this.state.name}!</h3>
        : <Login
            handleLogin={this.handleLogin}
            handleCreate={this.handleCreate}
            switchToCreate={this.switchToCreate}
            create={this.state.create}
          />
      }
      </div>
    )
  }
}
