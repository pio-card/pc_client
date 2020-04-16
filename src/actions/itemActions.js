//import action types
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
//import helper functions
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
// import http client
import axios from "axios";
//axios.defaults.proxy.host = "https://ubres.sse.codesandbox.io";
//axios.defaults.baseURL = `https://ubres.sse.codesandbox.io`;
//axios.defaults.baseURL = ` https://tjiyl.sse.codesandbox.io`;
axios.defaults.baseURL = `https://w56no.sse.codesandbox.io`;
//20
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//16.13
export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//15.3
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        //returning to the ItemReducer
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING //set the bool loading from false to true
  };
};
