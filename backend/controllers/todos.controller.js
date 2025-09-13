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
            return;

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

export const getallTodos = async (req ,res , next) =>{
    try {
        const todo = await Todo.find();
        if(!todo){
            res.status(400).json({
                success: false,
                message: "No todos added"
            })
            return;
        }
        
        res.status(200).json({
            success:true,
            message: "All todos fetched",
            data: {
                todo
            }
        });
        
    } catch (error) {
        next(error);
    }
}

export const getTodo = async (req , res, next)=>{
    try {
        const todoId = req.params.todoid;
        const todo = await Todo.findById({_id : todoId});
        if(!todo){
            const error = new Error("Id doesnt exist");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Todo fetched",
            data: {
                todo
            }
        });
        
    } catch (error) {
        next(error);
    }
}

export const deleteTodo = async (req,res,next) =>{
    try {
        const todoId = req.params.todoid;
        const todo = Todo.findById({_id : todoId});
        if(!todo){
             const error = new Error("No user found, wrong id entered");
            error.statusCode= 403;
            throw error;
        }
        const deleted =await Todo.deleteOne({_id : todoId});
        if(!deleted){
            const eee = new Error("Problem at deleting");
            eee.statusCode = 403;
            throw eee;
        }
          res.status(200).json({
            success: true,
            message: "Deleted Todo"

        })

    } catch (error) {
        next(error);
    }
}