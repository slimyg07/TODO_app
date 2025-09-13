import mongoose, {model} from "mongoose";
import User from "../models/user.model.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env.js";


export const createUser = async (req , res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
        const {username, email,password} = req.body;
            

        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }



        const newUser = await User.create([{username,email,password }], {session});
        
                console.log("Hii");

        const token = jwt.sign({userId : newUser[0].id}, JWT_SECRET, {expiresIn :JWT_EXPIRE});

        await session.commitTransaction();
        session.endSession;

        res.status(200).json({
            success : true,
            message : "User created successfully",
            data : {
                token,
                data : newUser[0]
            }
        })

    } catch (error) {
        next(error);
    }

}

export const loginUser = async (req,res,next) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email}).select('+password');
        if(!user){
            throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            const error = new Error("Invalid password bitch");
            error.statusCode = 404;
            throw error;
        }

        const token = jwt.sign({userId : user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE});

        res.status(200).json({
            success : true,
            message : "User logged in",
            data : {
                token,
                user
            }
        })
        
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }

}

export const SignoutUser = async (req,res,next) => {
    try {

        const {userId} = req.body;


        res.status(200).json({
            success : true,
            message : "User logged out",
            data : null
        })
        
    } catch (error) {
        next(error);
        
    }
}

export const getUser = async (req, res,next) => {
    try {

        const users = await User.find();
        if(!users){
            const error = new Error("No users found");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({
            success : true,
            message : "Fetched user details",
            users
        })
        
    } catch (error) {
        next(error);
    }
}