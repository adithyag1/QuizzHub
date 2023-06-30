import UserModel from "./models/Users.js";
import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://adithyagmoorthy:${process.env.MONGODB_PASSWORD}@quizzes.uncnis1.mongodb.net/quizzes`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  try {
    const users = await UserModel.find({});
    console.log(users);
  } catch (error) {
    console.error('Error querying the database:', error);
  } finally {
    mongoose.disconnect();
  }
}).catch((err) => {
  console.log('Connection error:', err);
});
