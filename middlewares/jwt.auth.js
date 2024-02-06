import jwt from "jsonwebtoken";

export const jwtAuth=(req,res,next)=>{
    const jwtToken=req.cookies.authToken;
    const payload=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
    if(payload){
        next();
    }else{
        res.status(401).redirect("/employee/signin");
    }
    
}