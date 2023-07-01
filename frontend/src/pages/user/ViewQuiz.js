import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar.js';
import axios from 'axios';

function ViewQuiz() {
  const { quizid } = useParams();
  const [quizName, setQuizName] = useState('');
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.post("http://localhost:3001/quizz/getquiz", {
        quizid: quizid
      });

      if (response.data) {
        console.log(response.data);
        setQuizName(response.data.quizName);
        setQuestionList(response.data.quiz);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className='view-quiz-container'>
      {quizName !== '' && <h2>{quizName}</h2>}
      {questionList.length > 0 && (
        <div >
          {questionList.map((question, index) => (
            <div className='view-quiz-question' key={index}>
              <div className='view-quiz-question-header'>
              <p className='view-quiz-header-element'>Q{question.questionNo}. </p>
              <p className='view-quiz-header-element'>{question.question}</p>
              </div>
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    {option.optionNumber}. {option.option}
                    {option.optionNumber === question.correctOption && <span className='view-quiz-header-element'> (Correct Option)</span>}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default ViewQuiz;