import File from "../models/files.js";


/**
 * search all files in database
 * params - input params from URL
 * @param {Object} params 
 * @returns {Object} - array of objects
 */
export const search = async (params = {}) => {

    const promise = await File.find(params).exec();
    const getAllFile = await File.
        find().
        populate('project').
        populate('task').
        exec();

    return getAllFile;
};

/**
 * create new file, store it in database
 * @param {*} file 
 * @returns {Object}
 */
export const create = async (file) => {
    const newFile = new File(file);
    const data = await newFile.save();
    const saveFile = await File.
        findOne({ _id: data._id }).
        populate('project').
        populate('task').
        exec();

    return saveFile;

};
/**
 * get a particular file from database
 * id - URL Object id i.e file id 
 * @param {ObjectId} id 
 * @returns {Object}
 */
export const get = async (id) => {
    const promise = await File.findById(id).exec();
    const getFile = await File.
        findOne({ _id: promise._id }).
        populate('project').
        populate('task').
        exec();

    return getFile;
};
/**
 * update an existing file in database
 * @param {Object} file 
 * @returns {Object}
 */
export const update = async (file) => {
    file._id = file.id;
    file.updatedAt = Date.now();
    const promise = await File.findByIdAndUpdate(file.id, file, { new: true }).exec();
    const updateFile = await File.
        findOne({ _id: promise._id }).
        populate('project').
        populate('task').
        exec();

    return updateFile;
};
/** 
 * remove a particular file in database
 * id - URL Object id i.e file id 
 * @param {ObjectId} id 
 * @returns {Object}
 */
export const remove = (id) => {
    const promise = File.findByIdAndRemove(id).exec();
    return promise;
};

export default {
    search: search,
    create: create,
    get: get,
    update: update,
    remove: remove
}