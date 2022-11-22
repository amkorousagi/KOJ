import express from "express";
import loginRoute from "./login";
const router = express();

// unauthorized api
router.use("/login", loginRoute);
// authorized api

export default router;
