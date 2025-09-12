import express from "express";
import { createCourse, getCreatorCourses, getPublishedCourses } from "../controller/courseController";
import isAuth from "../middleware/isAuth.js";


const courseRouter = express.Router();

courseRouter.post("/create",isAuth ,createCourse)
courseRouter.get("/getpublished", getPublishedCourses)
courseRouter.get("/getcreatorcourses", isAuth, getCreatorCourses)