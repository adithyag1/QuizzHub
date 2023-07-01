import { Router } from 'express';
import UserModel from '../models/Users.js';
import bcrypt from "bcrypt";
const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.json({status:0, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ status: 1, username: newUser.username, userId: newUser.id, message: "User registered successfully!" });
  }

  catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json({ status:1, username: user.username, userId: user.id, message: "Logged in successfully!" });
        //console.log('user: ', res.json)
      } else {
        res.json({ status:0, username: null, message: "Incorrect password" });
      }
    } else {
      res.json({ status:2, username: null, message: "User doesn't exist" });
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export { router as userRouter };
