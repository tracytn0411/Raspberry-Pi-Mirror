import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ResponsiveEmbed,
  Navbar,
  Nav,
  Button
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
          <Nav className="mr-auto">
            <Nav.Item className="px-2">
              {/* <Link to="/" className="btn btn-light">
                  Home
                </Link> */}
              <Button href="/Display" variant="info">
                Run
              </Button>
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
            <Col xs={6} className="PreDisplay-Custom">
              <Custom
                homeInput={this.state.homeInput}
                workInput={this.state.workInput}
                onHomeChange={this.handleHomeChange}
                onWorkChange={this.handleWorkChange}
              />
            </Col>
            <Col xs={6}>
              {/* <Container className="PredDisplay-Display">
                <Display />
              </Container> */}
              <div style={{ width: 500, height: "auto", fontSize: "3" }}>
                <ResponsiveEmbed aspectRatio="21by9">
                  <embed type="image/svg+xml" src="/display" />
                </ResponsiveEmbed>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HomePage;
