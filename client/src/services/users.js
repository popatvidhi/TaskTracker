import axios from 'axios';
import globals from '../_helpers/globals';

const URL = globals.domain;

/**
 * verify user service
 * @param {*} payload 
 * @returns 
 */
const authVerifyUserAPI = (payload) => {
  return axios
    .create({
      headers: {
        'Content-type': 'application/json',
      },
    })
    .get(`${URL}/users/verify-account/${payload}`);
};

/**
 * verify token service
 * @returns 
 */
const authUserMeAPI = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .get(`${URL}/users/me`);
};

/**
 * get all user service
 * @returns 
 */
const getAllMemebersAPI = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .get(`${URL}/users/members`);

  return data?.data?.allMember || [];
};

export const userService = {
  authVerifyUserAPI,
  authUserMeAPI,
  getAllMemebersAPI,
};
