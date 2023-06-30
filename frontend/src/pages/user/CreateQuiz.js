import React, { useState } from 'react';

function CreateQuiz() {
    const [currentOption, setCurrentOption] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questions, setQuestions] = useState([{ question: '', options: [] }]);

    const handleAddOption = () => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            const currentQuestionIndex = currentQuestion - 1;
            const currentQuestionObj = updatedQuestions[currentQuestionIndex];
            const updatedOptions = [...currentQuestionObj.options, currentOption];
            updatedQuestions[currentQuestionIndex] = {
                ...currentQuestionObj,
                options: updatedOptions,
            };
            return updatedQuestions;
        });
        setCurrentOption((prevValue) => prevValue + 1);
    };


    const handleAddQuestion = () => {
        setCurrentOption(1);
        setCurrentQuestion((prevValue) => prevValue + 1);
        setQuestions((prevQuestions) => [...prevQuestions, { question: '', options: [] }]);
    };

    const handleQuestionChange = (event) => {
        const { value } = event.target;
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[currentQuestion - 1] = {
                ...updatedQuestions[currentQuestion - 1],
                question: value,
            };
            return updatedQuestions;
        });
    };

    return (
        <div>
            {questions.map((questionObj, index) => (
                <div className='div1' key={index}>
                    <div className='questions-create-quiz'>
                        <div className='question-label'>{`Question ${index + 1}:`} </div>
                        <textarea
                            name={`question-${index}`}
                            rows={8}
                            cols={80}
                            value={questionObj.question}
                            onChange={handleQuestionChange}
                        />

                    </div>
                    {questionObj.options.map((option, optionIndex) => (
                        <div className='options-create-quiz' key={optionIndex}>
                            <div className='option-label'>{`Option ${option}:`}</div>
                            <input type="text" />
                        </div>
                    ))}
                    <button onClick={handleAddOption}>Add Option</button>
                </div>
            ))}
            <button onClick={handleAddQuestion}>Add Question</button>
        </div>
    );
}

export default CreateQuiz;
