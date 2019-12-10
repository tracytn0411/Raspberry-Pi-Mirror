import React, { Component } from "react";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Auth.css";
import logo from "../logo.svg";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      user: ""
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ user: response.username }, () => {
          localStorage.setItem("jwt", response.token);
          this.props.history.push("/");
        });
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  render() {
    return (
      <Container fluid>
        <Row className="Login-Box justify-content-center">
          <Col md={4}>
            <Card className="Login-Card">
              <Card.Img variant="top" className="mx-auto" src={logo} />

              <Card.Body>
                {/* <Card.Title className='Login-title text-center'>
                <h3>Login</h3>
              </Card.Title> */}
                <Form className="Login-Form" onSubmit={this.handleSubmit}>
                  <Form.Group controlId="loginUsername">
                   
                    <Form.Control
                      className="border-0"
                      type="username"
                      name="username"
                      placeholder="Your Username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="loginPassword">
                  

                    <Form.Control
                      className="border-0"
                      type="password"
                      name="password"
                      placeholder="Your Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    className="w-100 mt-4"
                    variant="outline-primary"
                    size='lg'
                    type="submit"
                    value="Submit"
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                <small className='text-muted'>
                  Not a member? <Link to="/register">Sign Up</Link>{" "}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
