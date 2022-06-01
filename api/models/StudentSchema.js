import mongoose from "mongoose";
import bcrypt from "bcrypt";

const StudentSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    room_number: {
      type: String,
      required: true,
    },
    hash_password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

StudentSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const Student = mongoose.model("student", StudentSchema);

export default Student;
