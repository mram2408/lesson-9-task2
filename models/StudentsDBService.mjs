import Student from "./Student.mjs";

class StudentsDBService {
  static async getList() {
    try {
      return (await Student.find({}).exec()) ?? [];
    } catch (error) {
      return [];
    }
  }
  static async create(data) {
    const student = new Student(data);
    return await student.save();
  }
  static async deleteById(id) {
    return await Student.findByIdAndDelete(id);
  }
  static async getById(id) {
    return await Student.findById(id);
  }
  static async update(id, data) {
    return await Student.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}

export default StudentsDBService;
