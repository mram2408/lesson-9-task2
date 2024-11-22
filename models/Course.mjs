import mongoose from "mongoose";
import config from "../config/default.mjs";

const { Schema } = mongoose;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  seminars: [
    {
      topic: {
        type: String,
        required: true,
      },
      responsibleStudent: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      duration: {
        type: String,
      },
    },
  ],
});

courseSchema.static.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some((db) => db.name === config.dataBaseName);
};

courseSchema.static.checkCollectionExists = async function () {
  if (await this.checkDatabaseExists()) {
    const collections = await mongoose.connection.db
      .listCollections({ name: "courses" })
      .toArray();
    return collections.length > 0;
  }
  return false;
};

const Course = mongoose.model("Course", courseSchema);
export default Course;
