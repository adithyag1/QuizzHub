import QuizUserModel from "../models/QuizUsers.js";
import express from 'express';

const router= express.Router();

router.post("/addtakenquiz", async(req,res)=>{
    const newRecord= new QuizUserModel(req.body);
    console.log('In here!')
    try{
        const response= await newRecord.save();
        if(response.quiz!==''){
            res.json({status:1 , message: 'Quiz successfully submitted!'});
        }
        else{
            res.json({status:0 , message: 'Error in uploading quiz.'})
        }
    }
    catch(err){
        res.json(err);
    }
})

router.post("/gettakenquizlist", async(req,res) => {
    const { userId } = req.body;
    try {
      const quizResult = await QuizUserModel.find({ user: userId }).populate('quiz', 'quizName');
      if (quizResult.length > 0) {
        const formattedResults = quizResult.map(result => ({
          quizId: result.quiz._id,
          quizName: result.quiz.quizName,
          score: result.score,
          totalQuestions: result.totalQuestions
        }));
        res.json({ quizResult: formattedResults });
      } else {
        res.json({ message: "No quizzes taken!" });
      }
    } catch (err) {
      res.json(err);
    }
  });
  

export {router as quizUsersRouter}

`is it also possible to populate the creator's name from UserModel from the creator field on the QuizModel? (kind of nested populate)`