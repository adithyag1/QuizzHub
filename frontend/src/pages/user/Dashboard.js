import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar.js'
import { AuthContext } from '../../context/AuthContext.js';
import CreatedQuizzes from '../../components/CreatedQuizzes.js';

function Dashboard() {
    const [active, setActive]= useState(1);
    const {activeUsername}= useContext(AuthContext);
    useEffect(()=>{
        console.log('Active User name: ',activeUsername);
    })
  return (
    <>
    <Navbar/>
    <div className='dashboard-navigate'>
        <div>Created Quizzes</div>
        <div>Taken Quizzes</div>
    </div>
    {
        active===1 ? (
            (<CreatedQuizzes username={activeUsername}/>)
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