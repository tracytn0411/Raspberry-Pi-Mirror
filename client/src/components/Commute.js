import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import "../containers/Display.css";

class Commute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commuteData: []
    };
  }

  componentDidMount() {
    this.getCommute();
  }

  getCommute() {
    axios
      .get(`api/commute`)
      .then(res => {
        console.log(res.data);
        this.setState({
          commuteData: res.data
        });
      })

      .catch(err => console.log(err));
  }

  render() {
    const { commuteData } = this.state;
    return (
      <Row className="Commute-row justify-content-end align-items-center">
        <Col xs={6} className="Commute-headline d-flex">
            <div className="mr-auto p-0">Commute</div>
          </Col>
        {commuteData.map(commute => (
          <Col xs={12} key={commute._id}>
            <Row className="justify-content-end align-items-center pb-3">
              <Col xs={6} className='p-0 text-left'>
                <h3>
                  <FaCar style={{ verticalAlign: "center", color: "magenta" }} />
                  Drive to {commute.name}
                </h3>
    
                {commute.directions.map((route, i) => (
                  <Row className="Route-row justify-content-end align-items-center" key={i}>
                    <Col xs={5}>{route.summary}</Col>
                    <Col xs={7} className='text-right'>{route.driveTime}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    );
  }
}

export default Commute;
