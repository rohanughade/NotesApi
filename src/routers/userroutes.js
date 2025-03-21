const express = require("express");
const userRoute = express.Router();
const {signup,signin} = require("../Controller/userController")

userRoute.post("/signup",signup);

userRoute.post("/signin",signin)

module.exports = userRoute;
