import { Router } from "express";
const router = Router();

import CoursesController from "../controllers/coursesController.mjs";
router.get("/", CoursesController.courses);
router.get("/add", CoursesController.addCourseForm);
router.post("/add", CoursesController.addCourse);
router.get("/edit/:id", CoursesController.courseEditForm);
router.post("/edit/:id", CoursesController.courseEdit);
router.delete("/delete", CoursesController.deleteCourse);

export default router;
