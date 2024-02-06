import { signUpModel,signInModel } from "../model/employee.repository.js";
import path from "path";
import jwt from "jsonwebtoken";

export const getSignUpController=(req,res,next)=>{
    res.status(200).sendFile(path.resolve("src","employees","views","signUp.html"));
}

export const getSignInController=(req,res,next)=>{
    res.status(200).sendFile(path.resolve("src","employees","views","signIn.html"));
}

export const signUpController=async(req,res,next)=>{
    const data=req.body;
    try{
        const isSignedUp=await signUpModel(data);
        if(isSignedUp){
            res.status(201).redirect("/employee/signin");
        }else{
            res.status(400).sendFile(path.resolve("src","employees","views","signUp.html"));
        }
    }catch(err){
        res.status(500).sendFile(path.resolve("src","employees","views","signUp.html"));
    }
}

export const signInController=async(req,res,next)=>{
    const credentials=req.body;
    try{
        const isValidUser=await signInModel(credentials);
        if(!isValidUser){
            res.status(400).redirect('/employee/signin');
        }else{
            const jwtToken=jwt.sign({user_id:credentials.user_id},process.env.JWT_SECRET_KEY,{
                    expiresIn:5*60
                });
            res.cookie('authToken',jwtToken);
            res.status(200).redirect('/interviews/list');
        }
    }catch(err){
        res.status(500).redirect('/employee/signin');
    }

}