import React from "react";

import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Moment from "./components/Moment";
import Weather from "./components/Weather";
import News from "./components/News";
import Forecast from "./components/Forecast";
import Map from "./components/Map";

function App() {
  return (
    <Container fluid className="App">
      <Row className="Moment">
        <Col>
          <Moment />
        </Col>
        <Col className="Weather text-right">
          <Weather />
        </Col>
      </Row>
      <Row className="Calendar">
        <Col>
          <p>Calendar API goes here</p>
        </Col>
        <Col className="Forecast text-right">
          <Forecast />
        </Col>
      </Row>
      <Row className="News mt-auto">
        <Col>
          <News />
        </Col>
        <Col className="Geo text-right">
          <p>Google Geo API goes here</p>
          <Map />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
