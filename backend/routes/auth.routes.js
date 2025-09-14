import { Router } from "express";
const authRouter = Router();
import { createUser, loginUser, SignoutUser,getUser, deleteUser, getUserdetails} from "../controllers/user.controller.js";

authRouter.post("/signin", loginUser);

authRouter.get("/users", getUser);

authRouter.get("/:id", getUserdetails);


authRouter.post("/signup", createUser);

authRouter.get("/signout", SignoutUser);





authRouter.delete("/:id", deleteUser);


// authRouter.put("/:id", (req, res) => res.send("User details updated succesfully"));


export default authRouter;