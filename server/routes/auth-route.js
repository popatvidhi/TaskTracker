import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

// following are the Auth routes
// used for resitering the user
router.route("/register").post(userController.save);
// used to login a user
router.route("/login").post(userController.index);
// use to register a user using google SSO
router.route("/google").post(userController.googleAuth);

export default router;
