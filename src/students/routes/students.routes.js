import express from "express";
import { studentsListController, addStudentController, newStudentController,studentCSVController } from "../controllers/students.controller.js";

export const studentRouter=express.Router();

studentRouter.route('/list').get(studentsListController);
studentRouter.route('/addStudent').get(addStudentController);

studentRouter.route('/list').post(studentCSVController);
studentRouter.route('/addStudent').post(newStudentController);