import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
//import commuteInput from '../components/commuteInput'
import '../containers/Display.css';
import axios from "axios";

class Custom extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleGeoUpdate = this.handleGeoUpdate.bind(this);
  }

  handleGeoUpdate(e) {
    e.preventDefault();

    axios
      .get("api/geo")
      .then(res => console.log(res.data))
      .catch(err =>
        console.log(`API geo to get current location error: ${err}`)
      );
  }

  handleNameChange(e) {
    var value = e.target.value;
    this.props.onNameChange(value);
  }

  handleAddressChange(e) {
    var value = e.target.value;
    this.props.onAddressChange(value);
  }

  handleSubmit(event) {
    event.preventDefault();
    var newName = this.props.nameInput;
    var newAddress = this.props.addressInput;
    console.log(
      `New commute input: ${newName} - ${newAddress}`
    );

    axios
      .post("api/commute", {
        name: newName,
        address: newAddress
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(`Custom commute error: ${err}`));
  }

  render() {
    return (
      <div className='Custom-Box'>
        <Row>
          <Col>
            <Button variant="info" onClick={this.handleGeoUpdate}>
              Update current location
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="commuteName">
                <Form.Control
                  type="text"
                  placeholder="Work, school..."
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="commueAddress">
                <Form.Control
                  type="text"
                  placeholder="160 Spear St, San Francisco, CA..."
                  onChange={this.handleAddressChange}
                />
              </Form.Group>
              <Button variant="info" type="submit">
                Add
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Custom;
