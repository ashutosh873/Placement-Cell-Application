import path from "path";
import { getStudentController,updateStudentController,updateStudentResultController,getStudentDetailsController } from "../../students/controllers/students.controller.js";
import { createInterviewModel, interviewsListModel, updateInterviewResultModel,getInterviewModel,formatInterviewDate } from "../model/interviews.repository.js"

export const scheduleInterviewController=(req,res,next)=>{
    res.status(200).sendFile(path.resolve("src","interviews","views","createInterview.html"));
}

export const interviewsListController=async(req,res,next)=>{
    try{
        const interviewsList=await interviewsListModel();
        if(!interviewsList.length){
            res.status(404).render(path.resolve("src","interviews","views","ListOfInterviews"),{interviewsList:null});
        }else{
            res.status(200).render(path.resolve("src","interviews","views","ListOfInterviews"),{interviewsList:interviewsList});
        }
    }catch(err){
        res.status(500).render(path.resolve("src","interviews","views","ListOfInterviews"),{interviewsList:null});
    }
}

export const interviewsResultController=async(req,res,next)=>{

    try{
        const student=await getStudentController(req.body.registrationNo);
        const interviewResultUpdated=await updateInterviewResultModel(req.body,student._id);
        const studentRecordUpdated=await updateStudentResultController(student._id,req.body.result,interviewResultUpdated.company);
        res.status(201).render(path.resolve("src","interviews","views","CandidateResult"),{company:req.body.company,studentName:req.body.name,studentRegNo:req.body.registrationNo,result:req.body.result});

    }catch(err){
        console.log(err);
        res.status(500).send("Error Occurred while updating student's interview result");
    }

}

export const createInterviewController=async(req,res,next)=>{
    const regNo=req.body.student;
    try{
        const ValidStudent=await getStudentController(regNo);
        if(!ValidStudent){
            res.status(400).sendFile(path.resolve("src","interviews","views","createInterview.html"));
        }else{
            const newInterview=req.body;
            newInterview.interviewDate=formatInterviewDate(new Date(newInterview.interviewDate));
            newInterview.student=ValidStudent._id;
            const ValidInterview=await createInterviewModel(newInterview);
            if(!ValidInterview){
                res.status(400).sendFile(path.resolve("src","interviews","views","createInterview.html"));
            }else{
                const studentRecordUpdated=await updateStudentController(ValidStudent,ValidInterview);
                res.status(201).redirect("/interviews/list");
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).sendFile(path.resolve("src","interviews","views","createInterview.html"));
    }
}

export const interviewCandidatesController=async(req,res,next)=>{
    const company=req.query.company;
    const interviewDate=req.query.interviewDate;
    const interviewDetails={company:company,interviewDate:interviewDate};
    try{
        const interview=await getInterviewModel(interviewDetails);
        const studentDetails=await getStudentDetailsController(interview.studentResults);
        res.status(200).render(path.resolve("src","interviews","views","CandidateDetails"),{interview:interview,studentDetails:studentDetails});
    }catch(err){
        console.log(err);
        res.status(500).redirect("/interviews/list");
    }
}