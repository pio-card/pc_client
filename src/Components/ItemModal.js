import React, { Component } from "react"; //16.1

import {
  //16.2
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { connect } from "react-redux"; //16.3
import { addItem } from "../actions/itemActions"; //16.4
import PropTypes from "prop-types";

//16.5
class ItemModal extends Component {
  //16.7 component state(s)
  state = {
    modal: false,
    name: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  //16.8 container/component method(s)
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };
    //16.12 pass new item via addItem action
    this.props.addItem(newItem);

    //close modal
    this.toggle();
  };
  //16.9 render method
  render() {
    //16.10 return function
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
//16.17 define const method
const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});
//16.6 and 16.16
export default connect(
  mapStateToProps,
  { addItem } //wrap with braces otherwise action won't work
)(ItemModal);
