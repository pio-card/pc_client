//create new reducer #1.1

//add code to new reducer file #1.3
//#1.3.1 import statements for types
import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

//#1.3.2 set the initial state object for this reducer
const initialSate = {
  msg: {},
  status: null,
  id: null
};
//#1.3.3 export a default function with initial state and action as params
export default function(state = initialSate, action) {
  //#1.3.4 include a switch construct with return value
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
