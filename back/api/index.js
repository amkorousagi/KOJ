import express from "express";
import loginRoute from "./login";
import joinRoute from "./createUsers";
import { authorization_handler } from "../middleware/authorization_handler";
import { USER_TYPE } from "../user_type";
const router = express();

// unauthorized api
router.use("/login", loginRoute);

// authorized api
router.use("/createUsers", authorization_handler(USER_TYPE.ADMIN), joinRoute);

export default router;
