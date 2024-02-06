import mongoose from "mongoose";
import bcrypt from "bcrypt";

const empSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is mandatory"]
    },
    user_id:{
        type:String,
        required:[true,"User_id is mandatory"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"]
    }
});
empSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,12);
    next();
});

const empModel=mongoose.model("Employee",empSchema);
export default empModel;