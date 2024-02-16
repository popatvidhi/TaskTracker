import { AuthConstants } from '../actionTypes/authActionTypes';

/**
 * 
 * User services actions
 */

export const loginUserAction = (payload) => ({
  type: AuthConstants.AUTH_LOGIN,
  payload,
});

export const signupUserAction = (payload) => ({
  type: AuthConstants.AUTH_SIGNUP,
  payload,
});

export const verifyUserAction = (payload) => ({
  type: AuthConstants.AUTH_VERIFYPASSWORD,
  payload,
});

export const logoutUserAction = () => ({
  type: AuthConstants.AUTH_LOGOUT,
});
