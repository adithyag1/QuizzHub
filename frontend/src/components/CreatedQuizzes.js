import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreatedQuizzes(props) {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/quizz/getquizlist", {
        username: props.username,
      });

      const { quiz, message } = response.data;
      if (quiz && quiz.length > 0) {
        setQuizList(quiz);
      } else {
        console.log("message: ", message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div>
      <h2>Created Quizzes</h2>
      {quizList.length > 0 ? (
        <ul>
          {quizList.map((quiz) => (
            <div className='quiz-list-box' key={quiz._id}>
              <div className='quiz-list-box-header'>
                <h3>{quiz.quizName}</h3>
                <p>Creator: {props.username}</p>
              </div>
              <p>No. of Questions: {quiz.noOfQuestions}</p>
              </div>
          ))}
        </ul>
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
}

export default CreatedQuizzes;
