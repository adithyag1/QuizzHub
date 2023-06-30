import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'

function Navbar() {
  const {activeUsername}= useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className='navbar-element'><Link to='/createquiz'>Create Quiz</Link></div>
      <div className='navbar-element'><Link to='/searchquiz'>Search by username</Link></div>
      <div className='navbar-element'>{activeUsername}</div>
    </div>
  )
}

export default Navbar