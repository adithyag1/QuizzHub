import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { quizzRouter } from './routes/quizzes.js';
import dotenv from 'dotenv';
import { quizUsersRouter } from './routes/quizusers.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/quizz", quizzRouter);
app.use("/quizusers", quizUsersRouter);

mongoose.connect(`mongodb+srv://adithyagmoorthy:${process.env.MONGODB_PASSWORD}@quizzes.uncnis1.mongodb.net/quizzes`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(3001, () => {
    console.log('Server started');
  });
}).catch((err) => {
  console.log('Connection error:', err);
});
