const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes.js");

//Middleware
app.use(express.json());
//Routes
app.use("/api/auth", authRouter);

module.exports = app;
