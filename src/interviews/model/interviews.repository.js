import interviewModel from "./interviews.schema.js";

export const createInterviewModel=async(newInterview)=>{
    const interviewExist=await interviewModel.findOne({
        company:newInterview.company,
        interviewDate:newInterview.interviewDate
    });
    if(interviewExist){
        interviewExist.studentResults.push({
            student:newInterview.student
        });
        return await interviewExist.save();
        
    }else{
        return await new interviewModel({
            company:newInterview.company,
            interviewDate:newInterview.interviewDate,
            studentResults:{
                    student:newInterview.student
            }
            
        }).save();
    
    }
    }


export const interviewsListModel=async()=>{
    return await interviewModel.find();
}

export const updateInterviewResultModel=async(reqBody,studentId)=>{
    return await interviewModel.findOneAndUpdate({
        company:reqBody.company,
        interviewDate:reqBody.interviewDate,
        "studentResults.student":studentId
    },{
        "studentResults.$.result":reqBody.result 
    },{
        new:true
    });
}

export const getInterviewModel=async(interviewDetails)=>{
    return await interviewModel.findOne(interviewDetails);
}

export const formatInterviewDate=(interviewDate)=>{
let year =interviewDate.getFullYear();
let month = (1 + interviewDate.getMonth()).toString();
month = month.length > 1 ? month : '0' + month;
let day = interviewDate.getDate().toString();
day = day.length > 1 ? day : '0' + day;
return day + '/' + month + '/' + year;
}

