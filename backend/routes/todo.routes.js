import { Router } from "express";



const todoRouter = Router();

todoRouter.get("/", (req, res) => {res.send("All todos fetched");});

todoRouter.get("/:todo-id", (req, res) => {res.send("Todo details fetched");});


todoRouter.post("/", (req, res) => {  res.send("Todo created successfully!")});

todoRouter.put("/:todo-id", (req, res) => {  res.send(`Todo with ID ${req.params.id} updated successfully!`)});

todoRouter.delete("/:todo-id", (req,res) => {res.send("Deleted succesfully")});

export default todoRouter;
