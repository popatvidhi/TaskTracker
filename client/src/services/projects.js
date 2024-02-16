import axios from 'axios';
import globals from '../_helpers/globals';

const URL = globals.domain;

/**
 * Get all projects services
 * @returns 
 */
const getAllProjectsAPI = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .get(`${URL}/project/all`);

  return data?.data || [];
};

/**
 * Create new project service
 * @param {*} payload 
 * @returns 
 */
const createProjectsAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .post(`${URL}/project/create`, payload);

  return data?.data || [];
};

/**
 * get a particular project service
 * @param {*} payload 
 * @returns 
 */
const getAProjectsAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .get(`${URL}/project/all/${payload}`);

  return data?.data || [];
};

/**
 * Update a particular project service
 * @param {*} payload 
 * @returns 
 */
const updateAProjectsAPI = async (payload) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .put(`${URL}/project/all/${payload.id}`, payload.data);

  return data?.data || [];
};

export const projectService = {
  getAllProjectsAPI,
  createProjectsAPI,
  getAProjectsAPI,
  updateAProjectsAPI,
};
