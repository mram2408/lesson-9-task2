import StudentsDBService from "../models/StudentsDBService.mjs";
import { validationResult } from "express-validator";

class StudentsController {
  static async students(req, res) {
    const data = await StudentsDBService.getList();
    res.render("students", { title: "Список студентів", studentsList: data });
  }
  static studentAddForm(req, res) {
    res.render("studentAddForm", {
      title: "Додати нового студента",
      errors: [],
      data: [],
    });
  }
  static async addStudent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = req.body;
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("studentAddForm", {
        title: "Додати нового студента",
        errors: errors.array(),
        data: data,
      });
    }

    const data = req.body;
    StudentsDBService.create(data);
    res.status(200).redirect("/students");
  }
  static async deleteStudent(req, res) {
    await StudentsDBService.deleteById(req.body.id);
    res.status(200).json({ success: true });
  }
  static async editStudentForm(req, res) {
    const studentData = await StudentsDBService.getById(req.params.id);
    res.render("studentAddForm", {
      title: "Змінити дані про студента",
      errors: [],
      data: studentData,
    });
  }
  static async editStudent(req, res) {
    await StudentsDBService.update(req.params.id, req.body);
    res.redirect("/students");
  }
}

export default StudentsController;
