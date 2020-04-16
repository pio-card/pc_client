//import action types
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../actions/types";

const initialState = {
  items: [],
  loading: false
};
//9.6
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload, //20.1
        loading: false //20.1
      };
    case DELETE_ITEM:
      return {
        //15.4.1
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state, //spread operator to be able to make a copy of the state object
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
