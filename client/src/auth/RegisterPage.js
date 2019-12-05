import React, { Component } from "react";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleRegister(event){
    event.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      if(res.status === 200) {
        this.props.history.push('/login')
      }else{
        const error = new Error(res.error);
        throw error
      }
    })
    .catch(err => {
      console.log(err)
      alert('Error signing up please try again')
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h3>Create an account</h3>
                </Card.Title>
                <Form onSubmit={this.handleRegister}>
                  <Form.Group controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name='email'
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="registerPassword">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                      type="password"
                      name='password'
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="info" type="submit">
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
              <small>Have an account? <Link to='/login'>Login</Link> </small>
            </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterPage;