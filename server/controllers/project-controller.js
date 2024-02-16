import mongoose from "mongoose";
import TaskColumn from "../models/taskColumns.js";
import * as projectService from "../services/project-services.js";

const errorhandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};
/**
 * search all projects in database
 * @param {Object} request 
 * @param {Object} response 
 */
export const index = async (request, response) => {
  try {
    const project = await projectService.search(request.user._id);
    setSuccessResponse(project, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * create new project, store it in database
 * @param {Object} request 
 * @param {Object} response 
 */
export const save = async (request, response) => {
  try {
    const project = { ...request.body }; //spread operator

    let obj = {
      name: "ToDo",
      description: "This is ToDo Column",
    };

    const defaultTask = new TaskColumn(obj);
    const data = await defaultTask.save();
    project.taskColumnsDetails = mongoose.Types.ObjectId(data._id);
    const newProject = await projectService.create(project);
    setSuccessResponse(newProject, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * get a particular project from database
 * @param {Object} request 
 * @param {Object} response 
 */
export const get = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    const project = await projectService.get(id);
    if (project === null) {
      errorhandler("Project does not exists", response);
    }
    setSuccessResponse(project, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * update an existing file in database
 * @param {Object} request 
 * @param {Object} response 
 */
export const update = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    const project = { ...request.body, id };
    const updatedProject = await projectService.update(project);
    setSuccessResponse(updatedProject, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * remove a particular project in database
 * @param {Object} request 
 * @param {Object} response 
 */
export const remove = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    const project = await projectService.remove(id);
    setSuccessResponse(
      {
        message: `Sucessfully Removed Project - ${id}`,
      },
      response
    );
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export default {
  index: index,
  save: save,
  get: get,
  update: update,
  remove: remove,
};
