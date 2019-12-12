import React, { Component } from "react";
import { Button, Form, Col, Row, ListGroup } from "react-bootstrap";
import axios from "axios";
import SaveDeleteMedia from "../components/SaveDeleteMedia";
//import Checkbox from "../components/Checkbox";
import "./HomePage.css";

class CustomMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: this.props.playList.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      )
    };

    this.submitHandle = this.submitHandle.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.saveDeleteMedia = this.saveDeleteMedia.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleTitleChange(e) {
    var value = e.target.value;
    this.props.onTitleChange(value);
  }

  handleMediaChange(e) {
    var value = e.target.value;
    this.props.onMediaChange(value);
  }

  submitHandle(e) {
    e.preventDefault();
    var newTitle = this.props.titleInput;
    var newMedia = this.props.linkInput;
    console.log("newTitle", newTitle, newMedia);

    axios
      .post("api/media", {
        title: newTitle,
        link: newMedia
      })
      .then(res => {
        console.log("res", res.data);
        this.props.submitClick(res.data);
      })
      .catch(err => console.log(`Custom commute error: ${err}`));
  }

  saveDeleteMedia(mediaID) {
    this.props.saveDeleteMedia(mediaID);
  }

  //Save and toggle between playlists

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
  };

  render() {
    const playList = this.props.playList;
    console.log("playList", playList);
    return (
      <div>
        <Row className="Custom-Music mx-1 my-2 py-2 px-1">
          <h3 className="p-3 mb-lg2">Youtube Player</h3>

          <Col xs={12} className="Media-Form">
            <Form onSubmit={this.submitHandle}>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Morning playlist..."
                    value={this.props.titleInput}
                    onChange={this.handleTitleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  URL
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Ex) https://www.youtube.com/watch?v=zwHF2y2ceSc"
                    value={this.props.linkInput}
                    onChange={this.handleMediaChange}
                  />
                </Col>
              </Form.Group>
              <Button variant="outline-info" type="submit">
                Add
              </Button>
            </Form>
          </Col>

          <Col xs={12} className="Playlist">
            <ListGroup variant="flush" className="mt-3">
              {playList.map(media => (
                <ListGroup.Item key={media._id}>
                  <Row className="Custom-CommuteList align-items-center">
                    <Col xs={3}>{media.title}</Col>
                    <Col xs={8}>{media.link}</Col>
                    {/* <Col xs={1}>
                        <Checkbox
                          label="Save"
                          isSelected={this.state.checkboxes[media]}
                          onCheckboxChange={this.handleCheckboxChange}
                          key={media._id}
                        />
                      </Col> */}
                    <Col xs={1}>
                      <SaveDeleteMedia
                        mediaID={media._id}
                        value={media._id}
                        data_media={media}
                        saveDeleteMedia={this.saveDeleteMedia}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CustomMusic;
