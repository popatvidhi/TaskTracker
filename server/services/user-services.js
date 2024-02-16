import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { request } from "http";

const SALT_WORK_FACTOR = 10;

/**
 * search a particular user in database
 * params - input params from URL
 * @param {Object} params 
 * @returns {Object} - array of objects
 */
export const search = (params = {}) => {
  const promise = User.findOne(params).exec();
  return promise;
};

/**
 * create new user, store it in database
 * @param {Object} user 
 * @returns {Object}
 */
export const create = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

/**
 * get a particular user from database
 * id - URL Object id i.e user id 
 * @param {ObjectId} id 
 * @returns {Object}
 */
export const get = (id) => {
  const promise = User.findById(id).exec();
  return promise;
};

/**
 * get all users from database
 * @returns {Object}
 */
export const getAll = () => {
  const promise = User.find().exec();
  return promise;
};

/**
 * update an existing user in database
 * @param {Object} user 
 * @returns {Object}
 */
export const update = (user) => {
  user._id = user.id;
  user.updatedAt = Date.now();
  const promise = User.findByIdAndUpdate(user.id, user, { new: true }).exec();
  return promise;
};

/**
 * update password of a particular user
 * @param {Object} user 
 * @returns {Object}
 */
export const updatePassword = (user) => {
  var password = user.password;
  // update it with hash
  bcrypt.hash(password, (hash) => {
    request.body.password = hash;
  });
  const promise = User.findByIdAndUpdate(user.id, user, { new: true }).exec();
  return promise;
};

/**
 * remove a particular project in database
 * id - URL Object id i.e user id 
 * @param {ObjectId} id 
 * @returns {Object}
 */
export const remove = (id) => {
  const promise = User.findByIdAndRemove(id).exec();
  return promise;
};

export default {
  search,
  create,
  get,
  update,
  remove,
  updatePassword,
  getAll,
};
