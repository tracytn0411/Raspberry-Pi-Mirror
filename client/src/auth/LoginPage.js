import React, { Component } from 'react';
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom'


export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>Login</h3>
              </Card.Title>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name='email'
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="loginPassword">
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    name='password'
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Button variant="info" type="submit" value='Submit'>
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <small>Not a member? <Link to='/register'>Sign Up</Link> </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  
    );
  }
}