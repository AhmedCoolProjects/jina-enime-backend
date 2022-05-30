import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routers/index.js";
import jsonwebtoken from "jsonwebtoken";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://jina-enime.vercel.app",
      "https://jina-enime.vercel.app/",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      function (err, decode) {
        if (err) req.student = undefined;
        req.student = decode;
        next();
      }
    );
  } else {
    req.student = undefined;
    next();
  }
});

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");

    app.use("/api", router);
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  });
