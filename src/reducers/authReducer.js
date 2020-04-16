//#1.1 create new reducer file - authReducer.js

//#1.3.1 import statements for types
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

//#1.3.2 set the initial state object for this reducer
const initialSate = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  isLoaded: false
};

//#1.3.3 export a default function with initial state and action as params
export default function(state = initialSate, action) {
  //#1.3.4 include a switch construct with return value
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state, //spread operator
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state, //spread operator
        isAuthenticated: true,
        isLoaded: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state, //spread operator
        ...action.payload,
        isAuthenticated: true,
        isLoaded: true
        // user: action.payload
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state, //spread operator
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isLoaded: false
      };
    default:
      return state;
  }
}
