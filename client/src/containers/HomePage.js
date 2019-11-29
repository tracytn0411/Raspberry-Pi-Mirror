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
      homeInput: "",
      workInput: ""
    };
    this.handleHomeChange = this.handleHomeChange.bind(this);
    this.handleWorkChange = this.handleWorkChange.bind(this);
  }

  handleHomeChange(homeInput) {
    this.setState({
      homeInput: homeInput
    });
  }

  handleWorkChange(workInput) {
    this.setState({
      workInput: workInput
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
              <Custom
                homeInput={this.state.homeInput}
                workInput={this.state.workInput}
                onHomeChange={this.handleHomeChange}
                onWorkChange={this.handleWorkChange}
              />
            </Col>
            <Col xs={6}>
              {/* <Container className="HomePage-Display">
                <Display style={{width: 100, height: 50}}/>
              </Container> */}
            
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HomePage;
