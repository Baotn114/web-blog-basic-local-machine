const express = require("express");

const router = express.Router();

//controller functions
const {signupUser, loginUser, comments, getComments} = require("../controllers/userController")


//Login Route
router.post("/signin", loginUser)


//Signup route
router.post("/signup", signupUser)

//Comment route
router.post("/comment/:id", comments);
router.get("/getComments/:id", getComments)

module.exports = router