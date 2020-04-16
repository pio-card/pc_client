//#1.3.5 create new action file - errorActions.js

//#1.3.5.1 import dependencie(s) for new action

//#1.3.5.2 import type(s) statements for new action
import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//#1.4 file methods to communicate with reducers

//return errors
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};
//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
