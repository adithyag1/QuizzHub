import QuizzModel from "../models/Quizzes.js";
import express from 'express';

const router= express.Router();

router.get("/", async(req,res)=>{
    try{
        const response= await QuizzModel.find({});
        res.json(response);
    }
    catch (err){
        res.json(err);
    }
});

router.post("/", async(req,res)=>{
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