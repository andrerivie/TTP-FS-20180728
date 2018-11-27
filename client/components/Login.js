import React from 'react'
import CreateAccountForm from './CreateAccountForm'
import LoginForm from './LoginForm'

const Login = (props) => {
  const { switchToCreate, handleCreate, handleLogin, create } = props
  return (
    <div className='form-container'>
      {create
      ? <CreateAccountForm
          handleCreate={handleCreate}
        />
      : <LoginForm
          handleLogin={handleLogin}
          switchToCreate={switchToCreate}
        />
      }
    </div>
  )
}


export default Login
