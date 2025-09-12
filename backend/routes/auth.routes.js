import { Router } from "express";
const authRouter = Router();
import { createUser, loginUser, SignoutUser} from "../controllers/user.controller.js";

authRouter.post("/signin", loginUser);

authRouter.get("/user/:id", (req, res) => {res.send("User  details fetched successfully!");
});

authRouter.post("/signup", createUser);

authRouter.get("/signout", SignoutUser);


authRouter.get("/users", (req, res) => {res.send("All User  details fetched successfully!");
});

// authRouter.delete("/:id", (req,res) => res.send("User deleted successfully"));


// authRouter.put("/:id", (req, res) => res.send("User details updated succesfully"));


export default authRouter;