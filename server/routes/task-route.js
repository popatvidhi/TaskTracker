import express from "express";
import * as taskController from "../controllers/task-controller.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();
// Envoking GET, POST, PUT and DELETE methods
// to fetch all the tasks allocated to the user based on projectid
router.route("/").post(verifyToken, taskController.save);

// to fetch all the tasks - ADMIN sided
router.route("/all").get(verifyToken, taskController.index);
// to fetch all the logs of the logged in user
router.route("/logs").get(verifyToken, taskController.getLogs);
// to fetch all the tasks based on projectId
router.route("/all").post(verifyToken, taskController.getAllTasks);
// to fetch the column details based on projectId
router.route("/column").post(verifyToken, taskController.createTaskColumn);
// to fetch the details of a specific task
router
  .route("/all/:id")
  .get(verifyToken, taskController.get)
  .put(verifyToken, taskController.update)
  .delete(verifyToken, taskController.remove);

export default router;
