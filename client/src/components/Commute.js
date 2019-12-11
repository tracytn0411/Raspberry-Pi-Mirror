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
            <Row className="justify-content-end align-items-center py-2">
              <Col xs={6} className='p-0 text-left'>
                <h3 className='Commute-icon p-0 m-0'>
                  <FaCar style={{ verticalAlign: "center", color: "magenta" }} />
                  Drive to {commute.name}
                </h3>
    
                {commute.directions.map((route, i) => (
                  <Row className="Commute-route justify-content-end align-items-center" key={i}>
                    <Col xs={7} className='text-secondary p-0'>{route.summary}</Col>
                    <Col xs={5} className='text-right p-0'>{route.driveTime.replace(/ hour/g,'hr').replace(/ minute/g,'min')}</Col>
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
