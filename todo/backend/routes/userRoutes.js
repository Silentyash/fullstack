const express= require("express");
const router= express.Router();

//controller will be importerd
const {registerUser,loginUser, currentUser}= require("../controllers/userController");
const uploadImage = require("../middleware/imageHandler");
const validateToken = require("../middleware/validateTokenHandler");

// defining routes and connecting with controller
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser)
router.post("/upload", uploadImage)



module.exports= router;
