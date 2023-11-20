const User= require("../model/userModel");
const asyncHandler= require("express-async-handler");
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const  express = require("express");


//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser= asyncHandler(async(req,res)=>{
    const {username,email,password}= req.body;
    const profileImage = req.file ? req.file.filename : null;
    

    if (!username||!email||!password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const ifUserAvailable= await User.findOne({email});
    if (ifUserAvailable){
        res.status(400);
        throw new Error("user already registered");
    }
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ifEmailRegex = await email.match(emailregex);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const ifpasswordCorrect = await password.match(passwordRegex);
    if (!ifpasswordCorrect|| !ifEmailRegex){
        res.status(400);
        throw new Error(
          " Email or password not valid, please enter valid email and  please enter password as per policy at least one uppercase letter, one lowercase letter, one number, one special character, and a minimum length of 8 characters"
        );
    }
    const hashedPassword= await bcrypt.hash(password,10)

    const user= await User.create({
        username,
        email,
        password:hashedPassword,
        profileImage
    })
    if (user){
        res.status(201).json({_id:user.id, email:user.email, profileImage:user.profileImage})
    }else{
        res.status(400);
        throw new Error("User Data is not valid");
    }
})


//@desc login a user
//@route POST /api/users/login
//@access public

const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}= req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("all fields are mandatory");
    }
    const user= await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))){
        const accesToken= jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30m'}    
        );
        res.status(200).json({accesToken});

    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }



})



//@desc current  user info
//@route POST /api/users/current
//@access public

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };