import QuizzModel from "../models/Quizzes.js";
import UserModel from "../models/Users.js"
import express from 'express';

const router= express.Router();

router.post("/getquizlist", async(req,res)=>{
    const {username}= req.body;
    try{
        await UserModel.findOne({username}).then(async(user)=>{
            if(user)
            {
                const userId= user.id;
                await QuizzModel.find({creator: userId}).then((quiz)=>{
                    if(quiz.length>0){
                        
                        res.json({quiz});
                    }
                    else{
                        res.json({message: "No quizzes yet!"})
                    }
                    
                }).catch((err)=>{
                    res.json(err);
                })
            }
            else{
                res.json({message: "User doesn't exist!"})
            }
            
        }).catch((err)=>{
            res.json(err)
        })
    }
    catch (err){
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