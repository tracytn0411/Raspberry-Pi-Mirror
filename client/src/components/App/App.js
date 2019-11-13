import React from 'react';
import {Container, Row} from 'react-bootstrap';
import Moment from './Moment'
import Weather from './Weather';


function App() {
  return (
    <Container fluid className="App">
      <Row>
        <Moment />
        <Weather />
      </Row>

    </Container>
  );
}


export default App;