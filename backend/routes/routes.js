const express = require("express");
const router = express.Router();

//Include all the routes of controller
const{
    getBlogs,
    getDetails,
    createBlogs
} = require("../controllers/pageController")

router.get("/", getBlogs);
router.get("/details/:id", getDetails);

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

router.post("/create", createBlogs);

module.exports = router
