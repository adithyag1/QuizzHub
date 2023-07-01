import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar.js';
import { AuthContext } from '../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

function TakeQuiz() {
  const { quizid } = useParams();
  const {activeUserId} = useContext(AuthContext);
  const [quizName, setQuizName] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [optionsMarked, setOptionsMarked] = useState([]);
  const navigate= useNavigate();
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
        setOptionsMarked(Array(response.data.quiz.length).fill(null));
      }
    } catch (err) {
      console.log(err);
    }
  }


  const handleOptionChange = (questionIndex, optionIndex) => {
    setOptionsMarked(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[questionIndex] = optionIndex + 1;
      return updatedOptions;
    });
  };

  const calculateScores = () => {
    let score = 0;

    try {
      questionList.forEach((question, index) => {
        const markedOption = optionsMarked[index];
        const correctOption = question.correctOption;

        if (markedOption === correctOption) {
          score += 1;
        }
      });

      return score;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

  const addTakenQuiz = async (calculatedScore) => {
    try {
      const response = await axios.post('http://localhost:3001/quizusers/addtakenquiz', {
        user: activeUserId,
        quiz: quizid,
        score: calculatedScore,
        totalQuestions: questionList.length,
        optionsMarked: optionsMarked
      });
      console.log(response);
      const { status, message } = response.data;
      if (status === 1) {
        alert(message);
      } else {
        console.log(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    console.log('options: ', optionsMarked);

    const score = calculateScores();
    await addTakenQuiz(score).then(()=>{
      navigate('/dashboard');
    })
      
  };
  

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
                    <label>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value={optionIndex + 1}
                        checked={optionsMarked[index] === optionIndex + 1}
                        onChange={() => handleOptionChange(index, optionIndex)}
                      />

                      {option.optionNumber}. {option.option}
                    </label>
                  </div>
                ))}

              </div>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;
