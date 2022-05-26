import { Router } from "express";
import Worker from "../models/workerSchema.js";

const workerRouter = Router();

// Get All Workers
workerRouter.get("/all", async (req, res) => {
  const workers = await Worker.find();
  res.send(workers);
});
// Get Worker by ID
workerRouter.get("/:id", async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  res.send(worker);
});
// Add Worker
workerRouter.post("/", async (req, res) => {
  const worker = new Worker({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    function: req.body.function,
    phone_number: req.body.phone_number,
  });
  await worker.save();
  res.send(`Worker ${worker.first_name} ${worker.last_name} added`);
});
// Update Worker
workerRouter.post("/update/:id", async (req, res) => {
  const worker = await Worker.findOneAndUpdate(
    { _id: req.params.id },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      function: req.body.function,
      phone_number: req.body.phone_number,
    }
  );
  res.send(`Worker ${worker.first_name} ${worker.last_name} updated`);
});
// Delete Worker
workerRouter.post("/delete/:id", async (req, res) => {
  const worker = await Worker.findByIdAndDelete(req.params.id);
  res.send(`Worker ${worker.first_name} ${worker.last_name} deleted`);
});

export default workerRouter;
