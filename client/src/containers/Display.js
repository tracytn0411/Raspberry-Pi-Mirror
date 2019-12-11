import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Display.css";
import Moment from "../components/Moment";
//import Weather from "../components/Weather";
import News from "../components/News";
import Forecast from "../components/Forecast";
import Music from "../components/Music";
import Commute from "../components/Commute";


function Display() {
  return (
    <Container fluid className="Display-Container m-0 p-0">
      <Row className='no-gutters'>
        <Col md={6} className='Display-Left d-flex flex-column justify-content-between'>
          <Row className='Left-Top'>
            <Col>
              <Moment />
            </Col>
          </Row>

          <Row className='Left-Middle'>
            <Col>
              <Music />
            </Col>
          </Row>

          <Row className='Left-Bottom'>
            <Col>
              <News />
            </Col>
          </Row>
        </Col>

        <Col md={6} className='Display-Right d-flex flex-column justify-content-start'>
          <Row className='Right-Top mb-4'>
            <Col><Forecast /></Col>
          </Row>
          <Row className='Right-Bottom'>
            <Col><Commute /></Col>
          </Row>
        </Col>

        {/* <Row className="Display-Top">
          <Col className='Top-Left'>
            <Moment />
            <Link to='/' className='btn btn-secondary'></Link>
          </Col>
          <Col className="Top-Right text-right">
            <Forecast />
            
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
            
          </Col>
        </Row> */}
        
      </Row>

      
    </Container>
  );
}

export default Display;
