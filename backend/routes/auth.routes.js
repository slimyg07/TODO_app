import { Router } from "express";
const authRouter = Router();
import { createUser, loginUser, SignoutUser,getUser, deleteUser} from "../controllers/user.controller.js";

authRouter.post("/signin", loginUser);

authRouter.get("/user/:id", (req, res) => {res.send("User  details fetched successfully!");
});

authRouter.post("/signup", createUser);

authRouter.get("/signout", SignoutUser);


authRouter.get("/users", getUser);


authRouter.delete("/:id", deleteUser);


// authRouter.put("/:id", (req, res) => res.send("User details updated succesfully"));


export default authRouter;