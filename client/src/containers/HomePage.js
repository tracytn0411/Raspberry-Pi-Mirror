import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav
} from "react-bootstrap";
import Custom from "./Custom";
//import Display from "./Display";
import { FaGithub } from "react-icons/fa";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      addressInput: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(nameInput) {
    this.setState({
      nameInput: nameInput
    });
  }

  handleAddressChange(addressInput) {
    this.setState({
      addressInput: addressInput
    });
  }
  render() {
    return (
      <>
        <Navbar expand="lg">
          <Navbar.Brand href="/">React Smart Mirror</Navbar.Brand>
          <Nav className="mr-auto px-3">
            <Nav.Item className='px-2'>
              <Link to="/display" className="btn btn-info">
                Run
              </Link>
            </Nav.Item>
          </Nav>
          <a
            href="https://github.com/tracytn0411/Raspberry-Pi-Mirror"
            role="button"
          >
            <FaGithub />
          </a>
        </Navbar>

        <Container fluid>
          <Row>
            <Col xs={6} className="HomePage-Custom">
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
              <Custom
                nameInput={this.state.nameInput}
                addressInput={this.state.addressInput}
                onNameChange={this.handleNameChange}
                onAddressChange={this.handleAddressChange}
              />

                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HomePage;
