import mongoose from "mongoose";
const interviewSchema=new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    interviewDate:{
        type:String,
        required:true
    },
    studentResults:[
        {
            student:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'student'
            },
            result:{
                type:String,
                enum:["Pass","Fail","On_Hold","Didnt_Attempt"],
                default:'Didnt_Attempt'
            }
        }
    ]
});

const interviewModel=mongoose.model("interview",interviewSchema);
export default interviewModel;