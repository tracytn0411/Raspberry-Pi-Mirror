import React, { Component } from "react";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import './Register.css'
import { Link } from "react-router-dom";
import "./Auth.css";
import logo from "../logo.svg";


class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleRegister(event) {
    event.preventDefault();
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      }
    })
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          this.props.history.push("/login");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.log(err);
        alert("Error signing up please try again");
      });
  }

  render() {
    return (
      <Container fluid>
        <Row className="Register-Box justify-content-center">
          <Col md={4}>
            <Card className="Register-Card">
              <Card.Img variant="top" className="mx-auto" src={logo} />

              <Card.Body>
                {/* <Card.Title className='Register-title text-center '>
                  <h3>Create an account</h3>
                </Card.Title> */}
                <Form className="Register-Form" onSubmit={this.handleRegister}>
                  <Form.Group controlId="registerUsername">
                   
                    <Form.Control
                      className="border-0"
                      type="username"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="registerPassword">
                   

                    <Form.Control
                      className="border-0"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    className="w-100 mt-4"
                    size='lg'
                    variant="outline-success"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                <small className='text-muted'>
                  Have an account? <Link to="/login">Login</Link>{" "}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterPage;
