const express = require("express");
const userModel = require("../models/user.model.js");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    res.status(400).json({
      message: "user already exist !",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    message: "user registered",
    user,
    token,
  });
});

module.exports = authRouter;
