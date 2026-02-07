const express = require("express");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const crypto = require("crypto");

// User registration :-
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    res.status(400).json({
      message: "user already exist !",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    //ye token genrate karta hai
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user registered",
    user,
    token,
  });
});

// User login :-
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "user is not found with this email address",
    });
  }
  //user.password db vala password hai and o === crypto me input password hash karke hum db hash ke sath  check karte hai ki same hai kya
  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "user logged in",
    user,
  });
});
module.exports = authRouter;
