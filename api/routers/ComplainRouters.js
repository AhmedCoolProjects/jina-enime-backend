import { Router } from "express";
import Complaint from "../models/ComplaintSchema.js";

const complainRouter = Router();

// Get All complaints
complainRouter.get("/all", async (req, res) => {
  const complaints = await Complaint.find();
  res.send(complaints);
});
// Get complaint by ID
complainRouter.get("/:id", async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  res.send(complaint);
});
// Add complaint
complainRouter.post("/", async (req, res) => {
  const complaint = new Complaint({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    worker: req.body.worker,
    student: req.body.student,
    date: req.body.date,
    image: req.body.image,
    tags: req.body.tags,
    type: req.body.type,
  });
  await complaint.save();
  res.send(`Complaint ${complaint.title} added`);
});
// Update complaint
complainRouter.post("/update/:id", async (req, res) => {
  const complaint = await Complaint.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      worker: req.body.worker,
      student: req.body.student,
      date: req.body.date,
      image: req.body.image,
      tags: req.body.tags,
      type: req.body.type,
    }
  );
  res.send(`Complaint ${complaint.title} updated`);
});
// Delete complaint
complainRouter.post("/delete/:id", async (req, res) => {
  const complaint = await Complaint.findByIdAndDelete(req.params.id);
  res.send(`Complaint ${complaint.title} deleted`);
});

export default complainRouter;
