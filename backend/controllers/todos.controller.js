import mongoose, {model} from "mongoose";
import User from "../models/user.model.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env.js";


export const createUser = async (req , res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
        const {name, email,password} = req.body;

        const existingUser = User.findOne({email});
        if(existingUser){
            const error = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password,salt);


        const newUser = await User.create([{name,email,password : hashed}], {session});

        const token = jwt.sign({userId : newUser[0].id}, JWT_SECRET, {expiresIn :JWT_EXPIRE});

        await session.commitTransaction;
        session.endSession;

        return res.status(200).json({
            success : true,
            message : "User created successfully",
            data : {
                token,
                data : newUser[0]
            }
        })

    } catch (error) {
        
    }

}