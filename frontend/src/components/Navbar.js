import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'

function Navbar() {
  const {activeUsername, setActiveUsername}= useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className='navbar-element'><Link to='/dashboard'>Dashboard</Link></div>
      <div className='navbar-element'><Link to='/createquiz'>Create Quiz</Link></div>
      <div className='navbar-element'><Link to='/searchquiz'>Search by username</Link></div>
      <div className='navbar-element' onClick={()=>{setActiveUsername(null)}}><Link to='/'>Logout</Link></div>
      <div className='navbar-element'>{activeUsername}</div>
    </div>
  )
}

export default Navbar