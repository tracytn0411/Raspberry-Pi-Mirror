import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Container } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import '../containers/Display.css'



class Commute extends Component {

constructor(props) {
  super(props)
  this.state = {
    toSchool: []
  }
}

componentDidMount(){
  this.getCommute()
}

getCommute() {
  axios
    .get(`api/commute`)
    .then(res => {
      console.log(res.data)
      this.setState({
        toSchool: res.data
      })
    })

    .catch(err => console.log(err))
}


render(){
  const routes = this.state.toSchool;
  return(
    <Row>
      <Container>
        
      <h3><FaCar style={{verticalAlign: 'center', color: 'magenta'}} /> Drive to School</h3>

      </Container>

      {routes.map((route, i) => (
        <Col xs={12} key={i}>
          <Row className='text-secondary'>
            <Col xs={8}>
          {route.summary}
            </Col>
            <Col xs={4}>
              {route.legs[0].duration.text}
            </Col>
          </Row>
        </Col>
      ))}
    </Row>


  )
}
}

export default Commute