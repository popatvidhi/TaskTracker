import mongoose from "mongoose";
import Project from "../models/projects.js";

/**
 * search all projects in database
 * userId - id of the user who created or contributes to the project 
 * @param {ObjectId} userId 
 * @returns {Object} - array of objects
 */
export const search = async (userId = {}) => {
  const getAllProject = await Project.find({
    $or: [
      { owner: mongoose.Types.ObjectId(userId) },
      { team: { $in: [mongoose.Types.ObjectId(userId)] } },
    ],
  })
    .populate("owner")
    .populate("tasks")
    .populate("files")
    .populate("team")
    .populate("taskColumnsDetails")
    .exec();

  return getAllProject;
};

/**
 * create new project, store it in database
 * @param {*} project 
 * @returns {Object}
 */
export const create = async (project) => {
  const newProject = new Project(project);
  const data = await newProject.save();
  const saveProject = await Project.findOne({ _id: data._id })
    .populate("owner")
    .populate("tasks")
    .populate("files")
    .populate("team")
    .populate("taskColumnsDetails")
    .exec();

  return saveProject;
};

/**
 * get a particular project from database
 * id - URL Object id i.e project id 
 * @param {ObjectId} id 
 * @returns {Object}
 */
export const get = async (id) => {
  const promise = await Project.findById({
    _id: mongoose.Types.ObjectId(id),
  }).exec();
  if (promise === null) return null;
  const getProject = await Project.findOne({ _id: promise._id })
    .populate("owner")
    .populate("tasks")
    .populate("files")
    .populate("team")
    .populate("taskColumnsDetails")
    .exec();

  return getProject;
};

/**
 * update an existing file in database
 * @param {Object} project 
 * @returns {Object}
 */
export const update = async (project) => {
  project._id = project.id;
  project.updatedAt = Date.now();
  const promise = await Project.findByIdAndUpdate(project.id, project, {
    new: true,
    _id: mongoose.Types.ObjectId(project.id),
  }).exec();
  if (promise === null)
    return null;
  const updateProject = await Project.findOne({ id: promise.id })
    .populate("owner")
    .populate("tasks")
    .populate("files")
    .populate("team")
    .populate("taskColumnsDetails")
    .exec();

  return updateProject;
};

/**
 * remove a particular project in database
 * id - URL Object id i.e project id 
 * @param {ObjectId} id 
 * @returns {Object}
 */
export const remove = (id) => {
  const promise = Project.findByIdAndRemove(id).exec();
  return promise;
};

export default {
  search: search,
  create: create,
  get: get,
  update: update,
  remove: remove,
};
