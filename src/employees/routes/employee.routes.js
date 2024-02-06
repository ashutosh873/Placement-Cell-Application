import express from "express";
import { getSignUpController, signUpController,getSignInController,signInController } from "../controllers/employee.controller.js";

export const empRouter=express.Router();
empRouter.route("/signup").get(getSignUpController);
empRouter.route("/signin").get(getSignInController);

empRouter.route("/signup").post(signUpController);
empRouter.route("/signin").post(signInController);
