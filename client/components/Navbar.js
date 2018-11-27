import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div id='navbar' className='navbar' style={{display: 'flex', justifyContent: 'space-between', padding: '24px' }}>
      <h3>Stock Up!</h3>
      <Link to='/portfolio'>Portfolio</Link>
      <Link to='/transactions'>Transactions</Link>
    </div>
  )
}

export default Navbar
