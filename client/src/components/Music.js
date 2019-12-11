import React, { Component } from 'react'
//import ReactPlayer from 'react-player'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "../containers/Display.css";

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaData: []
    };
  }

  async componentDidMount() {
    this.getMedia();
    //this.getMedia().then(links => this.setState({ mediaData : links}));
    //console.log('componentmount', mediaData)
  }

  getMedia() {
    axios
      .get("api/media")
      .then(res => {
        this.setState({
          mediaData: res.data
        });
      })
      .catch(err => {
        console.log(err)
        return null
      });
  }

  render() {
    const { mediaData } = this.state;
    console.log('Music.js', mediaData)
    return (
      mediaData.map((data, i) => {
        console.log(data)
        return <YouTubePlayer 
          url={data.link}
          playing
          controls
        />  
      })
    )
 
    // return <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />

  //   return <YouTubePlayer
  //    //url='https://www.youtube.com/watch?v=ApXoWvfEYVU'
  //   //url= {mediaData[2].link}
  //   playing
  //   controls
  //   // Other ReactPlayer props will work here
  // />

   //return <YouTubePlayer
   // url='https://www.youtube.com/watch?v=ShZ978fBl6Y'
   // width='80%'
   //height='80%'
   // playing
   //controls
   // Other ReactPlayer props will work here
   ///>

  
  }
}

export default Music