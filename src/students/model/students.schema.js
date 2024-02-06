import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    registrationNo:{
        type:Number,
        unique:true,
        required:[true,"Registration number is mandatory"]
    },
    batch:{
        type:Number,
        required:[true,"Batch is mandatory"]
    },
    name:{
        type:String,
        required:[true,"Name is mandatory"]
    },
    college:{
        type:String,
        required:[true,"College is mandatory"]
    },
    status:{
        type:String,
        enum:["placed", "not_placed"],
        default:'not_placed'
    },
    DSAScore:{
        type:Number,
        required:[true,"DSA Score is mandatory"]
    },
    WebDevScore:{
        type:Number,
        required:[true,"WebDev Score is mandatory"]
    },
    ReactScore:{
        type:Number,
        required:[true,"React Score is mandatory"]
    },
    interviews:[
        {
            company:String,
            date:String,
            result:{
                type:String,
                enum:["Pass","Fail","On_Hold","Didnt_Attempt"]
            }
        }
    ],
});

const studentModel=mongoose.model("student",studentSchema);
export default studentModel;