import mongoose from "mongoose";

const QuizUsersSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizzes",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions:{
        type: Number,
        required: true
    },
    optionsMarked: [Number],
  });
  QuizUsersSchema.index({ user: 1, quiz: 1 }, { unique: true });

  const QuizUserModel= mongoose.model("quizusers", QuizUsersSchema);
  export default QuizUserModel;
