import express from "express";
import * as projectController from "../controllers/project-controller.js";
import verifyToken from "../middlewares/auth.js";

const project = express.Router();
// Envoking GET, POST, PUT and DELETE methods
// to fetch all the projects of the logged in user
project.route("/all").get(verifyToken, projectController.index);
// to create a project
project.route("/create").post(verifyToken, projectController.save);
// to fetch a specific project
project
  .route("/all/:id")
  .get(verifyToken, projectController.get) // to GET the project
  .put(verifyToken, projectController.update) // to UPDATE the project
  .delete(verifyToken, projectController.remove); // to DELETE the project

export default project;
