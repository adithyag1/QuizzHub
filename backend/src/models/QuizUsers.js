import mongoose from "mongoose";

const QuizUsersSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizzes",
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    optionsMarked: [
        {
            questionNumber: Number,
            optionNumber: Number
        }
    ]
})