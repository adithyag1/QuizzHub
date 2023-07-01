import React, { useState } from 'react'
import Navbar from '../../components/Navbar.js'
import CreatedQuizzes from '../../components/CreatedQuizzes.js';

function SearchQuiz() {
  const [searchedUser, setSearchedUser]= useState('');
  const [showQuizList, setShowQuizList]= useState(false);

  const handleSearch = () => {
    setShowQuizList(true);
    console.log('Searched user: ', searchedUser);
  };

  return (
    <div>
      <Navbar/>
      <div>
        <label> 
          <input type='text' placeholder='username' onChange={(e)=>
          {setSearchedUser(e.target.value);
           setShowQuizList(false);
          }}/>
          <button onClick={handleSearch}>Search</button>
        </label>
      </div>
      {showQuizList && <CreatedQuizzes username={searchedUser}/>}
    </div>
  );
}

export default SearchQuiz;
