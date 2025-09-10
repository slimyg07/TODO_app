import { Router } from "express";
const authRouter = Router();

authRouter.post("/signin", (req, res) => { res.send("User logged in successfully!");
});

authRouter.get("/user/:id", (req, res) => {res.send("User  details fetched successfully!");
});

authRouter.post("/signup", (req, res) => res.send("User created successfully"));

authRouter.get("/signout", (req, res) => {res.send("User  signout successfully!");
});

authRouter.get("/users", (req, res) => {res.send("All User  details fetched successfully!");
});

// authRouter.delete("/:id", (req,res) => res.send("User deleted successfully"));


// authRouter.put("/:id", (req, res) => res.send("User details updated succesfully"));


export default authRouter;