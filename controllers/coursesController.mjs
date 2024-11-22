import CoursesDBService from "../models/CoursesDBService.mjs";
import StudentsDBService from "../models/StudentsDBService.mjs";

class CoursesController {
  static async courses(req, res) {
    const data = await CoursesDBService.getList();
    res.render("courses", { title: "Список курсів", coursesList: data });
  }
  static async addCourseForm(req, res) {
    const studentsList = await StudentsDBService.getList();
    res.render("addCourseForm", {
      title: "Додати новий курс",
      errors: [],
      data: [],
      studentsList: studentsList,
    });
  }
  static async addCourse(req, res) {
    const data = req.body;

    await CoursesDBService.create({
      courseName: data.courseName,
      duration: data.duration,
      students: data.students,
      seminars: [
        {
          topic: data.seminarTopic,
          duration: data.seminarDuration,
          responsibleStudent: data.responsibleStudent,
        },
      ],
    });
    res.redirect("/courses");
  }
  static async courseEditForm(req, res) {
    const studentsList = await StudentsDBService.getList();
    const courseData = await CoursesDBService.getById(req.params.id);
    res.render("editCourse", {
      title: "Керування курсом",
      courseData: courseData,
      studentsList: studentsList,
    });
  }
  static async courseEdit(req, res) {
    if (req.body.responsibleStudent) {
      let courseData = await CoursesDBService.getById(req.params.id);
      courseData.seminars.push(req.body);
      await CoursesDBService.update(req.params.id, courseData);
      res.redirect(`/courses/edit/${req.params.id}`);
      return;
    }

    const data = req.body;
    await CoursesDBService.update(req.params.id, data);
    res.redirect(`/courses/edit/${req.params.id}`);
  }
  static async deleteCourse(req, res) {
    await CoursesDBService.deleteById(req.body.id);
    res.status(200).json({ success: true });
  }
}

export default CoursesController;
