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
  Input,
  NavLink,
  Alert
} from "reactstrap";

import { connect } from "react-redux"; //16.3
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
//16.5
class RegisterModal extends Component {
  //16.7 component state(s)
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props; //deconstruct
    //console.log(error);
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    //if authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  //16.8 container/component method(s)
  toggle = () => {
    //clear errors
    this.props.clearErrors();
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
    const { name, email, password } = this.state; //deconstruct
    //create user object
    const newUser = {
      name,
      email,
      password
    };
    //attempt to register
    this.props.register(newUser);
    //close modal
    // this.toggle(); close it for now -test- to display errors
  };
  //16.9 render method
  render() {
    //16.10 return function
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
//16.6 and 16.16
export default connect(
  mapStateToProps,
  { register, clearErrors } //wrap with braces otherwise action won't work
)(RegisterModal);
