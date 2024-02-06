import express from "express";
import { interviewsListController, scheduleInterviewController, createInterviewController, interviewsResultController, interviewCandidatesController } from "../controllers/interviews.controller.js";
export const interviewRouter=express.Router();

interviewRouter.route('/list').get(interviewsListController);
interviewRouter.route('/scheduleInterview').get(scheduleInterviewController);
interviewRouter.route('/studentDetails').get(interviewCandidatesController);

interviewRouter.route('/studentDetails').post(interviewsResultController);
interviewRouter.route('/scheduleInterview').post(createInterviewController);