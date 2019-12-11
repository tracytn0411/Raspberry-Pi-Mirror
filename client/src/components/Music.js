import React, { Component } from 'react'
//import ReactPlayer from 'react-player'
import YouTubePlayer from 'react-player/lib/players/YouTube'

 
class Music extends Component {
  render () {
    // return <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
    return <YouTubePlayer
    url='https://www.youtube.com/watch?v=ShZ978fBl6Y'
    width='80%'
    height='80%'
    playing
    controls
    // Other ReactPlayer props will work here
  />
  
  }
}

export default Music