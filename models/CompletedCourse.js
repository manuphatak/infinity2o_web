const mongoose = require("mongoose");
const { Schema } = mongoose;

const completedCourseSchema = new Schema({
  courseName: String,
  providerName: String
});

mongoose.model("completedCourse", completedCourseSchema);
