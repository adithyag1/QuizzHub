import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'

function Navbar() {
  const {activeUsername, setActiveUsername}= useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className='appname'>QuizzHub</div>
      <div className='navbar-element'><Link className='navbar-link' to='/dashboard'>Dashboard</Link></div>
      <div className='navbar-element'><Link className='navbar-link'to='/createquiz'>Create Quiz</Link></div>
      <div className='navbar-element'><Link className='navbar-link' to='/searchquiz'>Search by username</Link></div>
      <div className='navbar-element' onClick={()=>{setActiveUsername(null)}}><Link className='navbar-link' to='/'>Logout</Link></div>
      <div className='navbar-element user'>{activeUsername}</div>
    </div>
  )
}

export default Navbar