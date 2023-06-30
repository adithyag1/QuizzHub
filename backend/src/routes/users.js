import { Router } from 'express';
import UserModel from '../models/Users.js';
import bcrypt from "bcrypt";
const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
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
        res.json({ username: user.username, message: "Logged in successfully!" });
      } else {
        res.json({ username: null, message: "Incorrect password" });
      }
    } else {
      res.json({ username: null, message: "Invalid username" });
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export { router as userRouter };
