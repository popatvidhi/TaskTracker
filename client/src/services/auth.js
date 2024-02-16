import axios from 'axios';
import globals from '../_helpers/globals';

const URL = globals.domain;

/**
 * Authoziization login user service
 * @param {*} payload 
 * @returns 
 */
const authLoginUserAPI = async (payload) => {
  const data = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
      },
    })
    .post(`${URL}/auth/login`, payload);

  const token = data?.data?.token;
  localStorage.setItem('refreshToken', token);
  return data?.data;
};

/**
 * Authorization signup user service
 * @param {*} payload 
 * @returns 
 */
const authSignUpUserAPI = (payload) => {
  return axios
    .create({
      headers: {
        'Content-type': 'application/json',
      },
    })
    .post(`${URL}/auth/register`, payload);
};

/**
 * Authorization verify user service
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

const authGoogleUserAPI = async (payload) => {
  const res = await axios
    .create({
      headers: {
        'Content-type': 'application/json',
      },
    })
    .post(`${URL}/auth/google`, payload);
  return res?.data;
};

export const authService = {
  authLoginUserAPI,
  authSignUpUserAPI,
  authVerifyUserAPI,
  authGoogleUserAPI,
};
