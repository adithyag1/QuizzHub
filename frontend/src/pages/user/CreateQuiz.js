import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';

function CreateQuiz() {
  const [currentOption, setCurrentOption] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const {activeUserId}= useContext(AuthContext)
  const [questions, setQuestions] = useState([
    {
      questionNo: 1,
      question: '',
      options: [{ optionNo: 1, option: '' }],
      correctOption: 1,
    },
  ]);

  const handleAddOption = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      //console.log('updated questions before: ', updatedQuestions);
      const currentQuestionIndex = currentQuestion - 1;
      //console.log('current index' : currentQuestionIndex);
      const currentQuestionObj = updatedQuestions[currentQuestionIndex];
      const updatedOptions = [
        ...currentQuestionObj.options,
        { optionNo: currentQuestionObj.options.length + 1, option: '' },
      ];
      //console.log('updated Options: ', updatedOptions);
      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestionObj,
        options: updatedOptions,
      };
      //console.log('updated questions after: ', updatedQuestions);
      return updatedQuestions;
    });
  };
  

  const handleAddQuestion = () => {
    setCurrentOption(1);
    setCurrentQuestion((prevValue) => prevValue + 1);
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionNo: prevQuestions.length + 1,
        question: '',
        options: [{ optionNo: 1, option: '' }],
        correctOption: 1,
      },
    ]);
  };

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    const questionIndex = parseInt(name.split('-')[1]);
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        question: value,
      };
      return updatedQuestions;
    });
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    const [questionIndex, optionIndex] = name.split('-').slice(1).map((index) => parseInt(index));
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const updatedOptions = [...updatedQuestions[questionIndex].options];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        option: value,
      };
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedOptions,
      };
      return updatedQuestions;
    });
  };

  const handleCorrectOptionChange = (event) => {
    const { name, value } = event.target;
    const questionIndex = parseInt(name.split('-')[1]);
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        correctOption: parseInt(value),
      };
      return updatedQuestions;
    });
  };
  const sendData= ()=>{

  }
  const handleFinishQuiz = () => {
    console.log(questions);
  };

  return (
    <div>
      {questions.map((questionObj, questionIndex) => (
        <div className='div1' key={questionIndex}>
          <div className='questions-create-quiz'>
            <div className='question-label'>{`Question ${questionIndex + 1}:`} </div>
            <textarea
              name={`question-${questionIndex}`}
              rows={8}
              cols={80}
              value={questionObj.question}
              onChange={handleQuestionChange}
            />
          </div>
          {questionObj.options.map((optionObj, optionIndex) => (
            <div className='options-create-quiz' key={optionIndex}>
              <div className='option-label'>{`Option ${optionObj.optionNo}:`}</div>
              <input
                type='text'
                name={`option-${questionIndex}-${optionIndex}`}
                value={optionObj.option}
                onChange={handleOptionChange}
              />
            </div>
          ))}
          <div className='correct-option'>
            <div className='option-label'>Correct Option:</div>
            <input
              type='number'
              min={1}
              max={questionObj.options.length}
              name={`correctOption-${questionIndex}`}
              value={questionObj.correctOption}
              onChange={handleCorrectOptionChange}
            />
          </div>
          <button onClick={handleAddOption}>Add Option</button>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleFinishQuiz}>Finish Quiz</button>
    </div>
  );
}

export default CreateQuiz;
