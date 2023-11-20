const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the username"]
    },
    email:{
        type: String,
        required: true,
        unique: [true, "email already taken"],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression to validate email
        lowercase: true, // Converts email to lowercase before saving
        trim: true, // Removes whitespace from the beginning and end of the email
    },
    password:{
        type: String,
        required: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, "choose strong password atleast 8 characters with 1 uppercase 1 owercase 1 number 1 special character"], 
    // Regular expression to validate password
    // At least one uppercase letter, one lowercase letter, one number, one special character, and minimum length of 8 characters
    },
    
},
{
    timestamps:true,
});
module.exports= mongoose.model("User",userSchema );