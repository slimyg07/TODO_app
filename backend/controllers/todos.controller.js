import Todo from "../models/todo.model.js";
import mongoose from "mongoose";

export const createTodos = async (req ,res, next) =>{
     const session = await mongoose.startSession();
        session.startTransaction();

    try {
       
        const {content, completed} = req.body;
        // const userID = req.User._id;

        if(!content){
            session.abortTransaction();
            res.status(400).json({
                success : false,
                message : "No content in todo"
            })

        }

        const todo = await Todo.create([{
            content,
            completed,
            // user : 123
        }], {session});

        await session.commitTransaction();
        

        res.status(200).json({
            success : true,
            message : "Todo created",
            data : {
                todo,
            }
        });
        
    } catch (error) {
        session.abortTransaction();
        
        next(error);
    }
    finally{
        session.endSession();
    }
}