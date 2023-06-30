import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';
import Navbar from '../../components/Navbar.js';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
  const [currentOption, setCurrentOption] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const {activeUserId}= useContext(AuthContext);
  const [loading, setLoading]= useState(false);
  const [quizName, setQuizName]= useState('');
  const [questions, setQuestions] = useState([
    {
      questionNo: 1,
      question: '',
      options: [{ optionNo: 1, option: '' }],
      correctOption: 1,
    },
  ]);
  const navigate= useNavigate();

  const handleAddOption = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestionIndex = currentQuestion - 1;
      const currentQuestionObj = updatedQuestions[currentQuestionIndex];
      const updatedOptions = [
        ...currentQuestionObj.options,
        { optionNo: currentQuestionObj.options.length + 1, option: '' },
      ];
      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestionObj,
        options: updatedOptions,
      };
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
  const sendData= async()=>{
    try{
      setLoading(true);
      const response= await axios.post('http://localhost:3001/quizz/createquiz',{
        quizName: quizName,
        quiz: questions,
        creator: activeUserId,
        noOfQuestions: questions.length
      });
      const {quizname, message}= response.data;
      if(quizname!==''){
        alert(message);
      }
      else{
        console.log('error in creating quiz: ',response);
      }
    }
    catch(err){
      console.log('error: ',err)
    }
    finally{
      setLoading(false);
    }
  }
  const handleFinishQuiz = () => {
    sendData().then(() => {
      navigate('/dashboard');
    });
  };

  return (
    <div>
      <Navbar/>
      <input type='text' placeholder='Quiz Name' onChange={(e)=>{setQuizName(e.target.value)}}/>
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
      <button onClick={handleFinishQuiz} disabled={loading}>{loading?`Uploading quiz...`: `Finish Quiz`}</button>
    </div>
  );
}

export default CreateQuiz;
