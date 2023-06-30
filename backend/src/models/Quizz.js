import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  quiz: [
    {
      question: String,
      options: [
        {
          optionNumber: Number,
          option: String
        }
      ],
      correctOption: Number
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

const QuizModel = mongoose.model("quiz", QuizSchema);
export default QuizModel;
