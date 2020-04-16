//import satements
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //can skip file name because default is index.js and file name is index.js

//define constants sattements
const initialSate = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialSate,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
); //using spread to assign array to a method
export default store;
