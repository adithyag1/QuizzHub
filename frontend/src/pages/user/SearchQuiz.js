import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar.js'
import CreatedQuizzes from '../../components/CreatedQuizzes.js';
import { AuthContext } from '../../context/AuthContext.js';

function SearchQuiz() {
  const [searchedUser, setSearchedUser] = useState('');
  const [showQuizList, setShowQuizList] = useState(false);
  const { activeUsername } = useContext(AuthContext);
  const [sameUser, setSameUser] = useState(false);


  const handleSearch = () => {
    setShowQuizList(true);
    activeUsername === searchedUser ? setSameUser(true) : setSameUser(false);
    console.log('Searched user: ', searchedUser);
  };

  return (
    <div>
      <Navbar />
      <div>
        <label>
          <input type='text' placeholder='username' onChange={(e) => {
            setSearchedUser(e.target.value);
            setShowQuizList(false);
          }} />
          <button onClick={handleSearch}>Search</button>
        </label>
      </div>
      {showQuizList ? (
        !sameUser ? (
          <CreatedQuizzes username={searchedUser} />
        ) : (
          <p>You can't take your own quizzes!</p>
        )
      ) : (
        <div></div>
      )}

    </div>
  );
}

export default SearchQuiz;
