import mongoose from "mongoose";
import config from "../config/default.mjs";

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  averageGrade: {
    type: Number,
    required: true,
  },
});

studentSchema.static.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some((db) => db.name === config.dataBaseName);
};

studentSchema.static.checkCollectionExists = async function () {
  if (await this.checkDatabaseExists()) {
    const collections = await mongoose.connection.db
      .listCollections({ name: "students" })
      .toArray();
    return collections.length > 0;
  }
  return false;
};

const Student = mongoose.model("Student", studentSchema);
export default Student;
