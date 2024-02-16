import * as taskService from "../services/task-services.js";
import mongoose from "mongoose";
import TaskColumn from "../models/taskColumns.js";

const errorhandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

/**
 * search all tasks in database
 * @param {Object} request
 * @param {Object} response
 */
export const index = async (request, response) => {
  try {
    const task = await taskService.search();
    setSuccessResponse(task, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const getLogs = async (request, response) => {
  try {
    const id = request?.user?._id;
    const task = await taskService.logSearch(id);
    setSuccessResponse(task.reverse(), response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * search tasks by projects
 * @param {Object} request
 * @param {Object} response
 */
export const getAllTasks = async (request, response) => {
  try {
    const projectId = request?.body?.projectId;
    if (!projectId) {
      errorhandler("Not a valid request", response);
    }
    const task = await taskService.searchTasks(projectId);
    setSuccessResponse(task, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * create new dynamic task status, store it in database
 * @param {Object} request
 * @param {Object} response
 */
export const createTaskColumn = async (request, response) => {
  try {
    const column = { ...request.body };
    const newTaskColumn = new TaskColumn(column);
    const data = await newTaskColumn.save();
    setSuccessResponse(data, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * create new task, store it in database
 * @param {Object} request
 * @param {Object} response
 */
export const save = async (request, response) => {
  try {
    const task = { ...request.body }; //spread operator
    // TODO - send email od creation
    const newTask = await taskService.create(task);
    setSuccessResponse(newTask, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * get a particular task from database
 * @param {Object} request
 * @param {Object} response
 * @returns
 */
export const get = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      return errorhandler("Not a valid request", response);
    }
    const task = await taskService.get(id);
    setSuccessResponse(task, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * update an existing task in database
 * @param {Object} request
 * @param {Object} response
 * @returns
 */
export const update = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      return errorhandler("Not a valid request", response);
    }
    const task = { ...request.body, id };
    const prev = await taskService.get(id);
    const updatedTask = await taskService.update(task);

    // TODO - send email of update
    if (prev?.status != updatedTask?.status) {
      let obj = {
        updatedBy: request?.user?._id,
        task: prev._id,
        project: prev?.project?._id,
      };
      const logData = await taskService.activityCreate(obj);
    }
    setSuccessResponse(updatedTask, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * remove a particular task in database
 * @param {Object} request
 * @param {Object} response
 * @returns
 */
export const remove = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      return errorhandler("Not a valid request", response);
    }
    if (!mongoose.Schema.Types.ObjectId.isValid(id)) {
      return errorhandler("Not a valid request", response);
    }
    const task = await taskService.remove(id);
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
