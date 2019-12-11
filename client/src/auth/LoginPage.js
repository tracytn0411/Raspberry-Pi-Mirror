import React, { Component } from 'react';
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './Login.css'

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      token: '',
      user: ''
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
    const email = this.state.email
    const password = this.state.password
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(response => {

      console.log(response)
      this.setState({user: response.username}, ()=> {
        localStorage.setItem('jwt', response.token)
this.props.history.push('/')
      })
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <Container>
      <Row className='Login-Box justify-content-center'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className='Login-title text-center'>
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
                <Button className='w-100' variant="info" type="submit" value='Submit'>
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className='text-center'>
              <small>Not a member? <Link to='/register'>Sign Up</Link> </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  
    );
  }
}