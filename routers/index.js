import { Router } from "express";
import studentRouter from "./StudentRouters.js";
import workerRouter from "./WorkerRouters.js";
import complainRouter from "./ComplainRouters.js";

const router = Router();

// Welcome
router.get("/", (req, res) => {
  res.send("Welcome to the JINA ENIME API");
});

router.use("/student", studentRouter);
router.use("/worker", workerRouter);
router.use("/complaint", complainRouter);

export default router;
