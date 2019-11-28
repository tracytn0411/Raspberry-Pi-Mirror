import React, { Component } from "react";
import { Button, Card, Form } from "react-bootstrap";
//import commuteInput from '../components/commuteInput'
import "./HomePage.css";
import axios from 'axios';

class Custom extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHomeChange = this.handleHomeChange.bind(this)
    this.handleWorkChange = this.handleWorkChange.bind(this)
    this.handleGeoUpdate = this.handleGeoUpdate.bind(this)
  }

  handleGeoUpdate(e) {
    e.preventDefault();

    axios
      .get('api/geo')
      .then(res => 
        console.log('Updated!'))
      .catch(err => console.log(`API geo to get current location error: ${err}`))
  }

  handleHomeChange(e) {
    var value =e.target.value;
    this.props.onHomeChange(value)
  }

  handleWorkChange(e) {
    var value = e.target.value;
    this.props.onWorkChange(value)
  }

  handleSubmit(event) {
    event.preventDefault();
    var homeAddress = this.props.homeInput;
    var workAddress = this.props.workInput;
    console.log(`Address input for home is ${homeAddress}, and work is ${workAddress}`)

    axios
      .post('api/commute', {
        home: homeAddress,
        work: workAddress
      })
      .then(res => {
        console.log(res.data)

      })
      .catch(err => console.log(`Custom commute error: ${err}`))
    
  }

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <Button variant="info" onClick={this.handleGeoUpdate}>
              Update current location
            </Button>
          </Card.Body>
        </Card>

        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formCommuteHome">
              <Form.Label>Home</Form.Label>
              <Form.Control
                type="text"
                placeholder="2000 Calerton St, Berkeley, CA..."
                onChange={this.handleHomeChange}
              />
            </Form.Group>
            <Form.Group controlId="formCommuteWork">
              <Form.Label>Work</Form.Label>
              <Form.Control
                type="text"
                placeholder="160 Spear St, San Francisco, CA..."
                onChange={this.handleWorkChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </>
    );
  }
}

export default Custom;
