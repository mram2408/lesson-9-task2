import { Router } from "express";
const router = Router();

import StudentsController from "../controllers/studentsController.mjs";

import { checkSchema } from "express-validator";
import StudentValidator from "../validators/studentValidator.mjs";

router.get("/", StudentsController.students);
router.get("/add", StudentsController.studentAddForm);
router.post(
  "/add",
  checkSchema(StudentValidator.studentSchema),
  StudentsController.addStudent
);
router.delete("/deleteStudent", StudentsController.deleteStudent);
router.get("/edit/:id", StudentsController.editStudentForm);
router.post("/edit/:id", StudentsController.editStudent);

export default router;
