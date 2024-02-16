import express from "express";
import * as userController from "../controllers/user-controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();
// use to get the details of the login user
router
  .route("/me")
  .get(verifyToken, userController.get) // to fetch the logged in user details
  .put(verifyToken, userController.update) // to update the details of the logged in user
  .delete(verifyToken, userController.remove); // to delete the user

// to fetch the details of the team memebers
router.route("/members").get(verifyToken, userController.getMembers);

// to verify the account
router
  .route("/verify-account/:confirmationCode")
  .get(userController.verifyUser);

// to update the account password
router.route("/update-password/:id").put(userController.updatePassword);

export default router;
