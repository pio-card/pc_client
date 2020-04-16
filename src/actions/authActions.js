//#1.3.5 create new action file - authActions.js

//#1.3.5.1 import dependencie(s) for new action
import axios from "axios";
import { returnErrors } from "./errorActions";

//#1.3.5.2 import type(s) statements for new action
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from "./types";

//#1.4 add end points requests

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};
//Register user
export const register = ({ name, email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //request body
  const body = JSON.stringify({ name, email, password });
  axios
    .post("api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
//login user
export const login = ({ email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //request body
  const body = JSON.stringify({ email, password });
  axios
    .post("api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
//logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
//setup config/headers and token
export const tokenConfig = getState => {
  //get token from local storage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //if token,add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
