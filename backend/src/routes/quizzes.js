import QuizzModel from "../models/Quizzes.js";
import UserModel from "../models/Users.js"
import express from 'express';

const router= express.Router();

router.post("/getquizlist", async(req,res)=>{
    const {username}= req.body;
    try{
        const user = await UserModel.findOne({username});
        if (user) {
            const userId = user._id;
            const quizzes = await QuizzModel.find({creator: userId}).select('_id noOfQuestions quizName creator');
            if (quizzes.length > 0) {
                res.json({quiz: quizzes, message: "Successfully fetched!"});
            } else {
                res.json({message: "No quizzes yet!"});
            }
        } else {
            res.json({message: "User doesn't exist!"});
        }
    } catch (err) {
        res.json(err);
    }
});


router.post("/createquiz", async(req,res)=>{
    const newQuizz= new QuizzModel(req.body)
    try{
        const response= await newQuizz.save();
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});
export {router as quizzRouter}