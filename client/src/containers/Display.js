import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'

import Moment from "../components/Moment";
//import Weather from "../components/Weather";
import News from "../components/News";
import Forecast from "../components/Forecast";
//import Map from "../components/Map";
import Commute from "../components/Commute";

function Display() {
  return (
    <Container fluid className="Display-Container">
      <Row className="Display-Top">
        <Col className='Top-Left'>
          <Moment />
          <Link to='/' className='btn btn-secondary'></Link>
        </Col>
        <Col className="Top-Right text-right">
          <Forecast />
          {/* <Weather /> */}
        </Col>
      </Row>

      <Row className="Calendar">
        <Col>
          <p>Calendar API goes here</p>
        </Col>
        <Col className="text-right"></Col>
      </Row>

      <Row className="Display-Bottom mt-auto">
        <Col className='Bottom-Left'>
          <News />
        </Col>
        <Col className="Bottom-Right text-right">
          <Commute />
          {/* <Map /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Display;
