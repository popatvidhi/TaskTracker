import axios from 'axios';
import globals from '../_helpers/globals';

const URL = globals.domain;

/**
 * Get all task service
 * @param {*} payload 
 * @returns 
 */
const getAllTasksAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .post(`${URL}/task/all`, payload);
  return data?.data || [];
};

/**
 * create a new task service
 * @param {*} payload 
 * @returns 
 */
const createATasksAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .post(`${URL}/task`, payload);

  return data?.data || [];
};

/**
 * create new task status column service
 * @param {*} payload 
 * @returns 
 */
const createATaskColumnAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .post(`${URL}/task/column`, payload);

  return data?.data || [];
};

/**
 * get a particular task detail service
 * @param {*} payload 
 * @returns 
 */
const getTaskDetailsAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .get(`${URL}/task/all/${payload}`, payload);
  return data?.data || [];
};

/**
 * update a particular task service
 * @param {*} payload 
 * @returns 
 */
const updateTaskDetailsAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .put(`${URL}/task/all/${payload.id}`, payload.data);
  return data?.data || [];
};

const getAllLogsAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .get(`${URL}/task/logs`, payload);
  return data?.data || [];
};
export const taskService = {
  getAllTasksAPI,
  createATasksAPI,
  createATaskColumnAPI,
  getTaskDetailsAPI,
  updateTaskDetailsAPI,
  getAllLogsAPI,
};
