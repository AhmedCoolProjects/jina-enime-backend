import bcrypt from "bcrypt";
import Student from "../models/StudentSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function register(req, res) {
  var newStudent = new Student({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    room_number: req.body.room_number,
    email: req.body.email,
    email_verified: false,
  });
  newStudent.hash_password = bcrypt.hashSync(req.body.password, 10);
  await newStudent.save(function (err, student) {
    if (err) {
      return res.send(err);
    }
    return res.status(200).json({
      message: "Student registered successfully",
      data: student,
    });
  });
}

export async function login(req, res) {
  Student.findOne({ email: req.body.email }, function (err, student) {
    if (err) {
      return res.send(err);
    }
    if (!student || !student.comparePassword(req.body.password)) {
      return res.status(401).json({
        message: "Authentication failed, Invalid email or password",
      });
    }
    return res.status(200).json({
      token: jwt.sign(
        {
          email: student.email,
          first_name: student.first_name,
          last_name: student.last_name,
          room_number: student.room_number,
          _id: student._id,
          email_verified: student.email_verified,
        },
        "RESTFULAPIs"
      ),
    });
  });
}

export function loginRequired(req, res, next) {
  if (req.student) {
    next();
  } else {
    return res.status(401).json({
      message: "Unauthorized student!!",
    });
  }
}

export function profile(req, res, next) {
  if (req.student) {
    res.send(req.student);
    next();
  } else {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

const TRANSPORTER = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bargadyahmed@gmail.com",
    pass: "ltlxqhxtfnuyjgqy",
  },
});

export function sendEmailVerification(mail_configuration, res) {
  TRANSPORTER.sendMail(mail_configuration, function (error, info) {
    if (error) throw Error(error);
    res.send(
      "Email Verification Sent to " +
        mail_configuration.to +
        ", Please Check Your Mail Box"
    );
  });
}
