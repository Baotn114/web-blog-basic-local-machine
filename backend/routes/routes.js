const express = require("express");
const router = express.Router();

//Include all the routes of controller
const{
    getBlogs,
    getDetails,
    createBlogs
} = require("../controllers/pageController")

router.get("/", getBlogs);
router.post("/create", createBlogs);
router.get("/details/:id", getDetails);


module.exports = router