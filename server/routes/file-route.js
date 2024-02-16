import express from "express";
import * as fileController from "../controllers/file-controller.js";

const router = express.Router();
// Envoking GET, POST, PUT and DELETE methods
// to fetch all the files
router.route("/all").get(fileController.index).post(fileController.save);
// to fetech a specific file
router
  .route("/all/:id")
  .get(fileController.get)
  .put(fileController.update)
  .delete(fileController.remove);

export default router;
