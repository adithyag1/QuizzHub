import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar.js';
import axios from 'axios';

function TakeQuiz() {
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
      {quizName !== '' && <h2>{quizName}</h2>}
      {questionList.length > 0 && (
        <div>
          {questionList.map((question, index) => (
            <div key={index}>
              <h3>Q{question.questionNo}. </h3>
              <p>{question.question}</p>
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    {option.optionNumber}. {option.option}
                    {option.optionNumber === question.correctOption && <strong> (Correct Option)</strong>}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;

`
`