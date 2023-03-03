// Set up a confidential environment
require("dotenv").config()

// Khởi tạo express
const express = require("express");

// Blogs' routes
const routes = require("./routes/routes");

// Users's routes
const userRoutes = require("./routes/user");

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Set up mongodb mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, ()=>{
            console.log("The server is listening to port and connected to the database")
        })
    })
    .catch((error)=>{
        console.log(error)
    })

// Routes to the api routes
app.use("/api/routes", routes);
app.use("/api/user", userRoutes)
