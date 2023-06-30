import React, { useState } from 'react'
import Navbar from '../../components/Navbar.js'
import CreatedQuizzes from '../../components/CreatedQuizzes.js';

function SearchQuiz() {
    const [searchedUser, setSearchedUser]= useState('adithyag');
  return (
    <div>
        <Navbar/>
        <div>
            Search: 
        </div>
        {
           searchedUser!=='' && (<CreatedQuizzes username={searchedUser}/>)
        }
        
    </div>
  )
}

export default SearchQuiz