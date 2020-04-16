import React from "react";
import ReactDOM from "react-dom";
//#1.5 to be used from the start
import { loadUser } from "./actions/authActions";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./store";

import AppNavBar from "./Components/AppNavBar.js";
import ShoppingList from "./Components/ShoppingList.js";
import ItemModal from "./Components/ItemModal.js";

import { Container } from "reactstrap";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
export default App;
