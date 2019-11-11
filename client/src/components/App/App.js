import React from 'react';
import {Container, Row} from 'react-bootstrap';
import Moment from './Moment'

function App() {
  return (
    <Container fluid className="App">
      <Row>
        <Moment />
      </Row>
    </Container>
  );
}

export default App;