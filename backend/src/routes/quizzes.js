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
            if (quizzes.length > 0 ) {
                res.json({quiz: quizzes, username: username, message: "Successfully fetched!"});
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
        console.log('response', response);
        if(response.quizName!==''){
            res.json({quizname: response.quizName ,message: "Quiz created successfully!"});
        }
        else{
            //console.log('response: ', response)
            res.json(response);
        }
    }
    catch(err){
        res.json(err);
    }
});

//get the actual quiz
router.post("/getquiz", async(req,res)=>
{
    const {quizid}= req.body;
    try{
        const quiz= await QuizzModel.findById(quizid);
        if(quiz){
            console.log(quiz);
            res.json(quiz);
        }
    }
    catch(err){
        res.json({error: err});
    }
})
export {router as quizzRouter}