import mongoose from "mongoose";
import ActivityLog from "../models/activityLogs.js";
import Task from "../models/tasks.js";

/**
 * search all tasks in database
 * params - input params from URL
 * @param {Object} params
 * @returns {Object} - array of objects
 */
export const search = async (params = {}) => {
  const promise = await Task.find(params).exec();
  const getAllTask = await Task.find()
    .populate("owner")
    .populate("assignee")
    .populate("files")
    .populate("project")
    .exec();

  return getAllTask;
};

export const logSearch = async (params) => {
  const getAllLogs = await ActivityLog.find({})
    .populate("updatedBy")
    .populate("task")
    .populate("project")
    .exec();
  return getAllLogs.filter(
    (item) => item.project.owner == params || item.project.team.includes(params)
  );
};

/**
 * search tasks by projects
 * @param {ObjectId} projectId
 * @returns {Object}
 */
export const searchTasks = async (projectId) => {
  const promise = await Task.find({
    project: [mongoose.Types.ObjectId(projectId)],
  })
    .populate("owner")
    .populate("project")
    .exec();

  return promise;
};

/**
 * create new task, store it in database
 * @param {Object} task
 * @returns {Object}
 */
export const create = async (task) => {
  const newTask = new Task(task);
  const data = await newTask.save();

  const saveTask = await Task.findOne({ _id: data._id })
    .populate("owner")
    .populate("assignee")
    .populate("files")
    .populate("project")
    .exec();

  return saveTask;
};

/**
 * get a particular task from database
 * id - URL Object id i.e task id
 * @param {*} id
 * @returns {Object}
 */
export const get = async (id) => {
  const promise = await Task.findById(id).exec();
  const getTask = await Task.findOne({ _id: promise._id })
    .populate("owner")
    .populate("assignee")
    .populate("files")
    .populate("project")
    .exec();

  return getTask;
};

/**
 * update an existing task in database
 * @param {Object} task
 * @returns {Object}
 */
export const update = async (task) => {
  task._id = task.id;
  task.updatedAt = Date.now();
  const promise = await Task.findByIdAndUpdate(task.id, task, {
    new: true,
  }).exec();
  const updateTask = await Task.findOne({ _id: promise._id })
    .populate("owner")
    .populate("assignee")
    .populate("files")
    .populate("project")
    .exec();

  return updateTask;
};

/**
 * remove a particular task in database
 * id - URL Object id i.e task id
 * @param {*} id
 * @returns {Object}
 */
export const remove = (id) => {
  const promise = Task.findByIdAndRemove(id).exec();
  return promise;
};

export const activityCreate = async (log) => {
  const newLog = new ActivityLog(log);
  const data = await newLog.save();
  const saveLog = await ActivityLog.findOne({ _id: data._id })
    .populate("updatedBy")
    .populate("task")
    .populate("project")
    .exec();

  return saveLog;
};

export default {
  search: search,
  create: create,
  get: get,
  update: update,
  remove: remove,
  activityCreate,
};
