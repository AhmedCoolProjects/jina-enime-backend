import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
// import studentRouter from "./StudentRouters.js";
// import workerRouter from "./WorkerRouters.js";
// import complainRouter from "./ComplainRouters.js";
import Student from "../models/StudentSchema.js";
import Worker from "../models/WorkerSchema.js";
import Complaint from "../models/ComplaintSchema.js";
import {
  login,
  profile,
  register,
  sendEmailVerification,
} from "../controllers/studentController.js";

const router = Router();
const studentRouter = Router();
const workerRouter = Router();
const complainRouter = Router();

// Student
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
studentRouter.post("/", (req, res) => {
  register(req, res);
});
// Login Student
studentRouter.post("/login", (req, res) => {
  login(req, res);
});
// Profile Student
studentRouter.post("/profile", (req, res, next) => {
  profile(req, res, next);
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
// Worker
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
// Complaint
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

// Welcome
router.get("/", (req, res) => {
  res.send("Welcome to the JINA ENIME API");
});
// Send Email Verification
// studentRouter.post("/sendemail", (req, res) => {
//   const EMAIL_TOKEN = jsonwebtoken.sign(
//     {
//       data: "Token Data",
//     },
//     "ourSecretKey",
//     { expiresIn: "10m" }
//   );
//   const MAIL_CONFIGURATION = {
//     from: "bargadyahmed@gmail.com",
//     to: req.body.email,
//     // Subject of Email
//     subject: "Jina ENIME | Email Verification",
//     // This would be the text of email body
//     text: `Hi! There, thanks for your interest in our services.
//            Please follow the given link to verify your email
//            https://jina-enime-backend.vercel.app/api/student/verify/${EMAIL_TOKEN},

//            This link will expire in 10 minutes.
//            Thanks`,
//   };
//   sendEmailVerification(MAIL_CONFIGURATION);
//   res.send("Email Sent ...");
// });

// studentRouter.get("/verify/:token", (req, res) => {
//   const { token } = req.params;

//   // Verifing the JWT token
//   jsonwebtoken.verify(token, "ourSecretKey", function (err, decoded) {
//     if (err) {
//       console.log(err);
//       res.send(
//         "Email verification failed ;(, possibly the link is invalid or expired"
//       );
//     } else {
//       console.log("Great");
//       res.send("Email verifified successfully");
//     }
//   });
// });

router.use("/student", studentRouter);
router.use("/worker", workerRouter);
router.use("/complaint", complainRouter);

export default router;
