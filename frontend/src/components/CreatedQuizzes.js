import React, { useEffect, useState } from 'react'
import axios from 'axios';

function CreatedQuizzes(props) {
  const [quizList, setQuizList]= useState([]);
  useEffect(()=>{
    fetchData();

  },[])

  const fetchData= async()=>{
    await axios.post("http://localhost:3001/quizz/getquizlist",{
        username: props.username
      
    }).then((res)=>{
      console.log('result', res.data.quiz)
    }).catch((err)=>{
      console.log('error: ',err);
    })
  }
  return (
    <div>CreatedQuizzes</div>
  )
}

export default CreatedQuizzes