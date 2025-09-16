import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';

export const authorization = async (req,res,next) =>{
    try {
        let token;
        const auth = req.headers.authorization;
        if(!auth){
            const error = new Error("No authorization token found");
            error.statusCode = 403;
            throw error;

        }
        if(!auth.startsWith('Bearer')){
            const error = new Error("Invalid auth header");
            error.statusCode = 403;
            throw error;
        }

        token = auth.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            const error = new Error("User not found with this token");
            error.statusCode = 403;
            throw error;
        }

        console.log(decoded);

        req.user = user;

        next();



    } catch (error) {
        
    }
}