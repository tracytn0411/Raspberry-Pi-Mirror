import React, {Component} from "react";
import moment from "moment";

class Moment extends Component {
  constructor(props){
    super(props)
    this.state = {
      //time: new Date()
      date: moment().format('dddd, MMMM D, YYYY'),
      time: moment().format('h:mm:ss a')

    }
  }

  // Update timer display every second
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: moment().format('dddd, MMMM D, YYYY'),
      time: moment().format('h:mm:ss a')

    })
  }

  render() {
    return (
      <>
        <div>{this.state.date}</div>
        <div className='Moment-time'>{this.state.time}</div>
      </>
    );
  }
}

export default Moment;