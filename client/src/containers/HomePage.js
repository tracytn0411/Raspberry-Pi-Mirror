import React, { Component } from 'react';
import axios from 'axios';
// import { Button } from 'react-bootstrap';
import commuteInput from '../components/commuteInput'

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      locationInput: '',
    }
  }

  render() {
    return (
      <>
        <commuteInput />
      </>
    )
  }
}

export default HomePage