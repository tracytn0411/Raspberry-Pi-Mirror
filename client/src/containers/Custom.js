import React, { Component } from "react";
import { Button, Form, Col, Row, Card, ListGroup } from "react-bootstrap";
//import commuteInput from '../components/commuteInput'
import "../containers/Display.css";
import axios from "axios";
import CommuteDelete from "../components/CommuteDelete";

class Custom extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleGeoUpdate = this.handleGeoUpdate.bind(this);
    this.deleteCommute = this.deleteCommute.bind(this);
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
    console.log(`New commute input: ${newName} - ${newAddress}`);

    axios
      .post("api/commute", {
        name: newName,
        address: newAddress
      })
      .then(res => {
        console.log(res.data);
        this.props.onSubmitClicked(res.data);
      })
      .catch(err => console.log(`Custom commute error: ${err}`));
  }

  deleteCommute(commuteId) {
    this.props.deleteCommute(commuteId);
  }

  render() {
    const commuteList = this.props.commuteList;
    return (
      <div className="Custom-Box">
        <Card>
          <Card.Body>
            <Button variant="info" onClick={this.handleGeoUpdate}>
              Update current location
            </Button>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h3>Commute</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="commuteName">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Work, school..."
                    value={this.props.nameInput}
                    onChange={this.handleNameChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="commueAddress">
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="160 Spear St, San Francisco, CA..."
                    value={this.props.addressInput}
                    onChange={this.handleAddressChange}
                  />
                </Col>
              </Form.Group>
              <Button variant="info" type="submit">
                Add
              </Button>
            </Form>
            
            <ListGroup variant="flush">
              {commuteList.map(commute => (
                <ListGroup.Item key={commute._id}>
                  <Row>
                    <Col xs={3}>{commute.name}</Col>
                    <Col xs={8}>{commute.address}</Col>
                    <Col xs={1}>
                      <CommuteDelete
                        commuteID={commute._id}
                        value={commute._id}
                        data_commute={commute}
                        deleteCommute={this.deleteCommute}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Custom;
