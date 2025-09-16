import { Router } from "express";
import { createTodos, getallTodos, getTodo,deleteTodo} from "../controllers/todos.controller.js";
import { authorization } from "../middleware/auth.middleware.js";   


const todoRouter = Router();

todoRouter.get("/",authorization,getallTodos);

todoRouter.get("/:todoid", getTodo);


todoRouter.post("/", createTodos);
            
todoRouter.put("/:todoid", (req, res) => {  res.send(`Todo with ID ${req.params.id} updated successfully!`)});

todoRouter.delete("/:todoid", deleteTodo);

export default todoRouter;
