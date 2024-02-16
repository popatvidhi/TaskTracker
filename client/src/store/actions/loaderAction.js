import { LoaderConstants } from '../actionTypes/loaderActionTypes';


/**
 * 
 * Loader actions
 * 
 */


export const setLoaderStateAction = (payload) => ({
  type: LoaderConstants.LOADER_STATE,
  payload,
});
