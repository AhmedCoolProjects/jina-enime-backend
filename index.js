import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routers/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
    app.use(express.json());
    app.use("/api", router);
    app.listen(PORT, () => {
      console.log("Server is running on port 5000");
    });
  })
  .then(() => (module.exports = app));
