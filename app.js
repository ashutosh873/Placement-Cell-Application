import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { empRouter } from "./src/employees/routes/employee.routes.js";
import { interviewRouter } from "./src/interviews/routes/interviews.routes.js";
import { studentRouter } from "./src/students/routes/students.routes.js";
import {jwtAuth} from "./middlewares/jwt.auth.js";


const configPath=path.resolve("config","placement_cell.env");
dotenv.config({ path: configPath });
const appServer=express();
appServer.use(express.urlencoded({
    extended:true
}));
appServer.set("view engine","ejs");

appServer.use(cookieParser());
appServer.use("/employee",empRouter);
appServer.use("/interviews",jwtAuth,interviewRouter);
appServer.use("/students",jwtAuth,studentRouter);

export default appServer;