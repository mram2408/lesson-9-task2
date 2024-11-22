class StudentValidator {
  static studentSchema = {
    name: {
      trim: true,
      escape: true,
      notEmpty: {
        errorMessage: "Ім'я не може бути пустим",
      },
    },
    age: {
      trim: true,
      escape: true,
      notEmpty: {
        errorMessage: "Вік не може бути пустим",
      },
      isInt: {
        options: { min: 10 },
        errorMessage: "Вік повинен бути більше 9",
      },
    },
    averageGrade: {
      trim: true,
      escape: true,
      isFloat: {
        options: { min: 1.0, max: 12.0 },
        errorMessage: "Середній бал має бути від 1 до 12",
      },
    },
  };
}

export default StudentValidator;
