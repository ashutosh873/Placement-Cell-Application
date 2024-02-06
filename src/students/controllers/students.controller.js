import {studentsListModel, newStudentModel, getStudentByRegNo, updateStudentModel, updateStudentResultModel,getStudentById,studentCSVModel} from "../model/students.repository.js";
import path from "path";

export const getStudentController=async(regNo)=>{
        return await getStudentByRegNo(regNo);
}

export const studentsListController=async(req,res,next)=>{
    try{
    const studentsList=await studentsListModel();
    if(!studentsList.length){
        res.status(404).render(path.resolve("src","students","views","ListOfStudents"),{studentsList:null});
    }else{
        res.status(200).render(path.resolve("src","students","views","ListOfStudents"),{studentsList:studentsList});
    }
}catch(err){
    res.status(500).render(path.resolve("src","students","views","ListOfStudents"),{studentsList:null});
}

}

export const addStudentController=(req,res,next)=>{
    res.status(200).sendFile(path.resolve("src","students","views","addStudent.html"));

}

export const newStudentController=async(req,res,next)=>{
    const newStudentData=req.body;
    try{
        const isStudentAdded=await newStudentModel(newStudentData);
        if(!isStudentAdded){
            res.status(400).redirect("/students/addStudent");
        }else{
            res.status(201).redirect("/students/list");
        }
    }catch(err){
        res.status(500).redirect("/students/addStudent");
    }
    
}

export const updateStudentController=async(student,interview)=>{
    return await updateStudentModel(student,interview);
}

export const updateStudentResultController=async(studentId,result,company)=>{
    let status="not_placed";
    if(result=="Pass"){
        status="placed";
    }
    return await updateStudentResultModel(studentId,result,status,company);
}

export const getStudentDetailsController=async(studentResults)=>{
    let studentDetails=[];
    for(let i=0;i<studentResults.length;i++){
        let student=await getStudentById(studentResults[i].student);
        studentDetails.push(student);
    }
    return studentDetails;
}

export const studentCSVController=async(req,res,next)=>{
    try{
        const csvFilePath=await studentCSVModel();
        res.status(200).download(csvFilePath);
    }catch(err){
        console.log(err);
        res.status(500).send("Error occurred while extracting student data in CSV format");
    }
    
}