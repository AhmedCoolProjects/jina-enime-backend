import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  room_number: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("student", StudentSchema);

export default Student;
