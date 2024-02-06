import studentModel from "./students.schema.js";
import { Parser } from "json2csv";
import { unwind } from "@json2csv/transforms";
import fs from "fs";
import path from "path";


export const getStudentById=async(studentId)=>{
    const student=await studentModel.findById(studentId);
    return {registrationNo:student.registrationNo,name:student.name};
}

export const getStudentByRegNo=async(regNo)=>{
    return await studentModel.findOne({registrationNo:regNo});
}

export const studentsListModel=async()=>{
    return await studentModel.find({},{_id:0});
}

export const newStudentModel=async(newStudentData)=>{
    return await new studentModel(newStudentData).save();
}

export const updateStudentModel=async(student,interview)=>{
    return await studentModel.findOneAndUpdate({
        registrationNo:student.registrationNo
    },{
        $push:{
            interviews:{
                        company:interview.company,
                        date:interview.interviewDate,
                        result:'Didnt_Attempt'
            }
           
        }
        
    },{
        new:true
    });
}

export const updateStudentResultModel=async(studentId,result,status,company)=>{
    return await studentModel.findOneAndUpdate({
        _id:studentId,
        "interviews.company":company
    },{
            status:status,
            "interviews.$.result":result  
        
    },{
        new:true
    });

}

export const studentCSVModel=async()=>{
    const studentData=await studentsListModel();
    const fields=["registrationNo","batch","name","college","status","DSAScore","WebDevScore","ReactScore","interviews.company","interviews.date","interviews.result"];
    const transforms=[unwind({ paths: ['interviews'] })];
    const parser=new Parser({fields,transforms});
    const csvStudentData=parser.parse(studentData.map((sdata) => sdata.toObject()));
    const dateTime = new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 14); 
    const filePath=path.resolve("Exported CSV Files","csv-"+dateTime+".csv");
    fs.writeFileSync(filePath,csvStudentData,()=>{

    });
    return filePath;
}