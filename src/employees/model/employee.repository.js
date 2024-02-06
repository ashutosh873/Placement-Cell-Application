import empModel from "./employee.schema.js";
import bcrypt from "bcrypt";

export const signUpModel=async (data)=>{
    return await new empModel(data).save(); 
}

export const signInModel=async(credentials)=>{
    const userExists=await empModel.findOne({
        user_id:credentials.user_id
    });
    if(userExists){
        const isPasswordValid=await bcrypt.compare(credentials.password,userExists.password);
        if(!isPasswordValid){
            return false;
        }
        return true;
    }else{
        return false;
    }
}