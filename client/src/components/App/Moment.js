import React from "react";
import {Col} from 'react-bootstrap';
import moment from "moment";

function Moment() {
  const date = moment().format('dddd, MMMM D, YYYY'); 
  const time = moment().format('h:mm a');

  return (
    <Col className='Moment'>
      <div>{date}</div>
      <div className='Moment-time'>{time}</div>
    </Col>
  );
}

export default Moment;
