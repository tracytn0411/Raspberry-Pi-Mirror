import React, { Component } from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import "../containers/Display.css";

class Moment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //time: new Date()
      date: moment().format("dddd, MMM D, YYYY"),
      time: moment().format("h:mm a")
    };
  }

  // Update timer display every minute
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: moment().format("dddd, MMM D, YYYY"),
      time: moment().format("h:mm a")
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12}>{this.state.date}</Col>
        <Col xs={12}>
          <div className="Moment-time">{this.state.time}</div>
        </Col>
      </Row>
    );
  }
}

export default Moment;
