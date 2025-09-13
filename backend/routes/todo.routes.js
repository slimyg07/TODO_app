import { Router } from "express";
import { createTodos, getallTodos } from "../controllers/todos.controller.js";



const todoRouter = Router();

todoRouter.get("/",getallTodos);

todoRouter.get("/:todo-id", (req, res) => {res.send("Todo details fetched");});


todoRouter.post("/", createTodos);

todoRouter.put("/:todo-id", (req, res) => {  res.send(`Todo with ID ${req.params.id} updated successfully!`)});

todoRouter.delete("/:todo-id", (req,res) => {res.send("Deleted succesfully")});

export default todoRouter;
