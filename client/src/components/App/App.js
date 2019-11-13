import React from 'react';

import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import Moment from './Moment';
import Weather from './Weather';


function App() {
  return (
    <Container fluid className="App">

      <Row className='Moment'>
        <Col>
          <Moment />
        </Col>
        <Col className='Weather text-right'>
          <Weather />
        </Col>
      </Row>
      <Row className='Calendar'>
        <Col>
          <p>Calendar API goes here</p>
        </Col>
        <Col className='Forecase text-right'>
          <p>Weather Forecast goes here</p>
        </Col>
      </Row>
      <Row className='News mt-auto'>
        <Col>
          <p>News Feed goes here</p>
        </Col>
        <Col className='Geo text-right'>
          <p>Google Geo API goes here</p>
        </Col>
      </Row>

    </Container>
  );
}


export default App;