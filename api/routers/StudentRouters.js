import { Router } from "express";
import Student from "../models/StudentSchema.js";

const studentRouter = Router();

// Get All Students
studentRouter.get("/all", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});
// Get Student by ID
studentRouter.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.send(student);
});
// Add Student
studentRouter.post("/", async (req, res) => {
  const student = new Student({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    room_number: req.body.room_number,
  });
  await student.save();
  res.send(`Student ${student.first_name} ${student.last_name} added`);
});
// Update Student
studentRouter.post("/update/:id", async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { _id: req.params.id },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      room_number: req.body.room_number,
    }
  );
  res.send(`Student ${student.first_name} ${student.last_name} updated`);
});
// Delete Student
studentRouter.post("/delete/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  res.send(`Student ${student.first_name} ${student.last_name} deleted`);
});

export default studentRouter;
