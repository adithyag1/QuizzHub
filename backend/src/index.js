import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { quizzRouter } from './routes/quizz.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/quizz", quizzRouter);

const {MONGODB_PASSWORD}= process.env;
mongoose.connect(`mongodb+srv://adithyagmoorthy:${MONGODB_PASSWORD}@quizzes.uncnis1.mongodb.net/quizzes`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(3001, () => {
    console.log('Server started');
  });
}).catch((err) => {
  console.log('Connection error:', err);
});
