import React, { Component } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      history: [],
      create: false,
      funds: 0,
      name: ''
    };
    this.switchToCreate = this.switchToCreate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  switchToCreate(e) {
    e.preventDefault();
    this.setState({
      create: true
    });
  }

  async handleLogin(e, data) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', data);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        this.setState({
          userId: response.data.id,
          name: response.data.name,
          funds: response.data.funds
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async handleCreate(e, data) {
    try {
      e.preventDefault();
      const response = await axios.post('/api/users', data);
      this.setState({
        userId: response.data.id,
        name: response.data.name,
        funds: response.data.funds,
        create: false
      });
    } catch (error) {
      console.error(error);
      alert('Invalid Account Details!', error);
    }
  }

  render() {
    const userId = this.state.userId;
    return (
      <div id="app-container" style={{ padding: '12px' }}>
        {userId ? (
          <div>
            <Navbar />
            <Route
              exact
              path="/"
              render={props => <Portfolio {...props} userInfo={this.state} />}
            />
            <Route
              path="/transactions"
              render={props => (
                <Transactions {...props} userInfo={this.state} />
              )}
            />
            <Route
              path="/portfolio"
              render={props => <Portfolio {...props} userInfo={this.state} />}
            />
          </div>
        ) : (
          <div className="login-container" style={{ textAlign: 'center' }}>
            <h2>Welcome to Stock Up!</h2>
            <Login
              handleLogin={this.handleLogin}
              handleCreate={this.handleCreate}
              switchToCreate={this.switchToCreate}
              create={this.state.create}
            />
          </div>
        )}
      </div>
    );
  }
}
