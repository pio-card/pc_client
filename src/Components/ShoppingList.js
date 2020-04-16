import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";

//13
import { PropTypes } from "prop-types";

class ShoppingList extends Component {
  //13.1 include component properties for validation
  static propTypes = {
    //13.2
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired, //item represent our state but we mapped it as a component prop see#12 below
    isAuthenticated: PropTypes.bool
  };

  //14
  componentDidMount() {
    //14.1
    this.props.getItems();
  }
  //15.5.1
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  render() {
    //14.2

    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

//12 param: state - passing an object
const mapStateToProps = state => ({
  item: state.item, //item is defined in our rootreducer
  isAuthenticated: state.auth.isAuthenticated
});

//11.3
export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
