import Course from "./Course.mjs";

class CoursesDBService {
  static async getList() {
    try {
      return (
        (await Course.find({})
          .populate("students")
          .populate("seminars.responsibleStudent")
          .exec()) ?? []
      );
    } catch (error) {
      return [];
    }
  }
  static async getById(id) {
    return await Course.findById(id)
      .populate("students")
      .populate("seminars.responsibleStudent");
  }
  static async create(data) {
    const course = new Course(data);
    return await course.save();
  }
  static async update(id, data) {
    return await Course.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  static async deleteById(id) {
    return await Course.findByIdAndDelete(id);
  }
}

export default CoursesDBService;
