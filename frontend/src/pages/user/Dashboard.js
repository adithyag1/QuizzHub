import React, { useState } from 'react'
import Navbar from '../../components/Navbar.js'

function Dashboard() {
    const [active, setActive]= useState(1);
  return (
    <>
    <Navbar/>
    <div className='dashboard-navigate'>
        <div>Created Quizzes</div>
        <div>Taken Quizzes</div>
    </div>
    {
        active===1 ? (
            <div>
                num1
            </div>
        ):(
            <div>
                num2
            </div>
        )
    }
    </>
  )
}

export default Dashboard