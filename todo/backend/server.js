const express= require("express");
const connectDb= require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const multer = require("multer");
const uploadImage = require("./middleware/imageHandler");
const dotenv = require("dotenv").config();
const router = require("./routes/todoRoute");

connectDb();
const app=express();

const port= process.env.PORT ||8001;

//all middlewares
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.post("/upload", uploadImage);
app.use("/api/todo", require("./routes/todoRoute"));


app.listen(port,()=>{
    console.log(`server running on port: ${port}`)
});

