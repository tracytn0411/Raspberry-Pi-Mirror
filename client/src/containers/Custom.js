import React, { Component } from "react";
import { Button, Form, Col, Row, ListGroup } from "react-bootstrap";
//import commuteInput from '../components/commuteInput'
import "../containers/Display.css";
import axios from "axios";
import CommuteDelete from "../components/CommuteDelete";
import './HomePage.css'

class Custom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGeo: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleGeoUpdate = this.handleGeoUpdate.bind(this);
    this.deleteCommute = this.deleteCommute.bind(this);
  }

  componentDidMount() {
    this.getGeo();
  }

  getGeo() {
    axios.get("api/geo").then(res => {
      this.setState({
        currentGeo: res.data
      });
    });
  }

  handleGeoUpdate(e) {
    e.preventDefault();
    axios
      .post("api/geo")
      .then(res => {
        console.log(res.data);
        this.setState({
          currentGeo: res.data
        });
      })
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
    const { currentGeo } = this.state;
    return (
      <>
        <Row className="Custom-Geo mx-1 my-2 py-2 px-1 align-items-center">
          <Col md={4}>
            <Button variant="outline-primary" className='Button-Geo' onClick={this.handleGeoUpdate}>
              Update current location
            </Button>
          </Col>
          <Col>
            <p>
              Your current location is{" "}
              <span className="font-italic font-weight-bold">
                {currentGeo.city}, {currentGeo.state}
              </span>
              .
            </p>
          </Col>
        </Row>

        <Row className='Custom-Commute mx-1 my-2 py-2 px-1'>
          <h3 className='p-3 mb-lg-2'>Commute</h3>

          <Col xs={12} className='Commute-Form'>
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
              <Button variant="outline-info" className='Button-Commute' type="submit">
                Add
              </Button>
            </Form>
          </Col>
          
          <Col xs={12} className='Commute-List'>
            <ListGroup variant="flush" className="mt-3">
              {commuteList.map(commute => (
                <ListGroup.Item key={commute._id}>
                  <Row className="align-items-center">
                    <Col xs={2} style={{color: 'magenta'}} className='font-weight-bold text-capitalize'>{commute.name}</Col>
                    <Col xs={9}>{commute.address}</Col>
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
          </Col>
        </Row>
      </>
    );
  }
}

export default Custom;
