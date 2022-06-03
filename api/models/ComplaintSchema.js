import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Refused"],
      default: "Pending",
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "worker",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Complaint", "Suggestion"],
      required: true,
    },
    need: {
      type: String,
      enum: ["Plumber", "Electrician", "Carpenter", "Painter", "Other"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("complaint", ComplaintSchema);

export default Complaint;
