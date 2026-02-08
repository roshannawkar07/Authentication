const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);

module.exports = app;
