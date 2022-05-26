import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  function: {
    type: String,
    required: true,
    enum: ["Electrecian", "Plumber", "Carpenter"],
  },
  phone_number: {
    type: String,
    required: true,
  },
});

const Worker = mongoose.model("worker", WorkerSchema);

export default Worker;
