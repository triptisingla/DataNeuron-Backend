import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name!"],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a Password!"],
        minLength: [4, "Password must contain at least 4 characters!"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


export const User = mongoose.model("User", userSchema);
