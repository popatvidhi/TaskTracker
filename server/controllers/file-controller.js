import mongoose from "mongoose";
import * as fileService from "../services/file-services.js";

const errorhandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

/**
 * search all files in database
 * @param {Object} request 
 * @param {Object} response 
 */
export const index = async (request, response) => {
  try {
    const file = await fileService.search();
    setSuccessResponse(file, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * create new file, store it in database
 * @param {Object} request 
 * @param {Object} response 
 */
export const save = async (request, response) => {
  try {
    const file = { ...request.body }; //spread operator
    const newFile = await fileService.create(file);
    setSuccessResponse(newFile, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * get a particular file from database
 * @param {Object} request 
 * @param {Object} response 
 * @returns 
 */
export const get = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    if (!mongoose.Schema.Types.ObjectId.isValid(id)) {
      return errorhandler("Not a valid request", response);
    }
    const file = await fileService.get(id);
    setSuccessResponse(file, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * update an existing file in database
 * @param {Object} request 
 * @param {Object} response 
 * @returns 
 */
export const update = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    if (!mongoose.Schema.Types.ObjectId.isValid(id)) {
      return errorhandler("Not a valid request", response);
    }
    const file = { ...request.body, id };
    const updatedFile = await fileService.update(file);
    setSuccessResponse(updatedFile, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * remove a particular file in database
 * @param {Object} request 
 * @param {Object} response 
 * @returns 
 */
export const remove = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    if (!mongoose.Schema.Types.ObjectId.isValid(id)) {
      return errorhandler("Not a valid request", response);
    }
    const file = await fileService.remove(id);
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
