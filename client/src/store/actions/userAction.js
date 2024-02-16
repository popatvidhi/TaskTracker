import { UserConstants } from '../actionTypes/userActionTypes';

/**
 * 
 * USer services actions
 * 
 */
export const setUserDataAction = (payload) => ({
  type: UserConstants.USER_DATA,
  payload,
});
