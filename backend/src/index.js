import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { quizzRouter } from './routes/quizzes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/quizz", quizzRouter);

mongoose.connect("mongodb+srv://adithyagmoorthy:dabidaye1710@quizzes.uncnis1.mongodb.net/quizzes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(3001, () => {
    console.log('Server started');
  });
}).catch((err) => {
  console.log('Connection error:', err);
});
