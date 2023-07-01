import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function TakenQuizzes() {
  const [quizResultList, setQuizResultList] = useState([]);
  const {activeUserId}= useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/quizusers/gettakenquizlist", {
        userId: activeUserId,
      });

      const { quizResult, message } = response.data;
      if (quizResult && quizResult.length > 0) {
        console.log('quizResult: ',quizResult);
        setQuizResultList(quizResult);
      } else {
        console.log("message: ", message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className='created-quizzes-container'>
      {quizResultList.length > 0 ? (
        <ul>
          {quizResultList.map((quiz) => (
            <div
              className='quiz-list-box'
              key={quiz._id}
            >
              <div className='quiz-list-box-header'>
                <h3>{quiz.quizName}</h3>
              </div>
              <p>Score- {quiz.score}/{quiz.totalQuestions}</p>
            </div>
          ))}
        </ul>
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
}

export default TakenQuizzes;