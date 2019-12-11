import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Form
} from "react-bootstrap";
import Custom from "./Custom";
import CustomMusic from "./CustomMusic"
import axios from "axios";
import "./HomePage.css";
import { FaGithub } from "react-icons/fa";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      addressInput: "",
      commuteData: [],
      user: "",
      titleInput: "",
      linkInput: "",
      mediaData: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.deleteCommute = this.deleteCommute.bind(this);
    this.logout = this.logout.bind(this);
    //steve - bind methods
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleMediaClick = this.handleMediaClick.bind(this);
    this.saveDeleteMedia = this.saveDeleteMedia.bind(this);
  }

  componentDidMount() {
    this.getCommute();
    this.getUser();
    this.getMedia();
  }

  getUser() {
    const user = localStorage.getItem("jwt");
    this.setState({
      user: user
    });
  }

  getCommute() {
    axios
      .get(`/api/commute`)
      .then(res => {
        console.log(res.data);
        this.setState({
          commuteData: res.data
        });
      })
      .catch(err => console.log(`React axios get /api/commute error: ${err}`));
  }

  deleteCommute(id) {
    axios
      .delete(`/api/commute/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .then(this.getCommute())
      .catch(err => console.log(`Delete commute error: ${err}`));
  }

  handleNameChange(nameInput) {
    this.setState({
      nameInput: nameInput
    });
  }

  handleAddressChange(addressInput) {
    this.setState({
      addressInput: addressInput
    });
  }

  handleSubmitClicked(data) {
    var newCommute = this.state.commuteData.concat(data);
    this.setState({
      commuteData: newCommute,
      nameInput: "",
      addressInput: ""
    });
  }

  logout = event => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    this.setState({ user: "" }, () => {
      this.props.history.push("/login");
    });
  };

  //Steve - media 
  handleTitleChange(titleInput) {
    this.setState({
      titleInput: titleInput
    });
  }

  handleMediaChange(linkInput) {
    this.setState({
      linkInput: linkInput
    });
  }

  handleMediaClick(data) {
    var newMediaData = this.state.mediaData.concat(data);
    this.setState({
      mediaData: newMediaData,
      titleInput: "",
      linkInput: ""
    });
  }

  getMedia() {
    axios
      .get(`/api/media`)
      .then(res => {
        console.log(res.data);
        this.setState({
          mediaData: res.data
        });
      })
      .catch(err => console.log(`Axios get /api/media error: ${err}`));
  }

  saveDeleteMedia(id) {
    axios
      .delete(`/api/media/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .then(this.getMedia())
      .catch(err => console.log(`Delete media error: ${err}`));
  }
  ////steve - media

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">React Smart Mirror</Navbar.Brand>
          <Nav className="mr-auto px-3">
            <Nav.Item className="px-2">
              <Link to="/display" className="btn btn-outline-primary">
                Run
              </Link>
            </Nav.Item>
          </Nav>
          <a
            href="https://github.com/tracytn0411/Raspberry-Pi-Mirror"
            role="button"
          >
            <FaGithub />
          </a>
        </Navbar>

        <Container fluid className="HomePage-Container mt-1">
          <Row>
            <Col xs={6} className="HomePage-Left">
              <Row>
                <Col>
                  <Form onSubmit={this.logout}>
                    <Button type="submit" value="Submit" variant='outline-secondary'>
                      Log Out
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Col>

            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <Custom
                    nameInput={this.state.nameInput}
                    addressInput={this.state.addressInput}
                    commuteList={this.state.commuteData}
                    onNameChange={this.handleNameChange}
                    onAddressChange={this.handleAddressChange}
                    onSubmitClicked={this.handleSubmitClicked}
                    deleteCommute={this.deleteCommute}
                  />
                </Col>
                <Col xs={12}>
                  <CustomMusic 
                    titleInput={this.state.titleInput}
                    linkInput={this.state.linkInput}
                    playList={this.state.mediaData}
                    onTitleChange={this.handleTitleChange}
                    onMediaChange={this.handleMediaChange}
                    submitClick={this.handleMediaClick}
                    saveDeleteMedia={this.saveDeleteMedia}
                  />
                </Col>
              </Row>

            //<Col xs={6} className="HomePage-Right">
              //<Custom
                //nameInput={this.state.nameInput}
                //addressInput={this.state.addressInput}
                //commuteList={this.state.commuteData}
                //onNameChange={this.handleNameChange}
                //onAddressChange={this.handleAddressChange}
                //onSubmitClicked={this.handleSubmitClicked}
                //deleteCommute={this.deleteCommute}
              ///>

            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default HomePage;
