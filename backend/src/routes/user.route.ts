import { Router } from "express";
import { Signin, Signup } from "../controllers/auth.controller";
import { verifyUser } from "../middleware/auth.middleware";
import {
  CreatePost,
  DeletePost,
  getProfile,
  UpdatePost,
} from "../controllers/user.application";
import {
  getPostsByRandomUsers,
  getUsers,
} from "../controllers/application.controller";

export const userRouter = Router();

userRouter.post("/signup", Signup);
userRouter.post("/signin", Signin);
userRouter.get("/users", verifyUser, getProfile);
userRouter.post("/new", verifyUser, CreatePost);
userRouter.put("/post:postId", verifyUser, UpdatePost);
userRouter.delete("/post:postId", verifyUser, DeletePost);
userRouter.get("/posts", verifyUser, getPostsByRandomUsers);
userRouter.get("/others", verifyUser, getUsers);
