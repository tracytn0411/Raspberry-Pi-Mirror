import React, { Component } from "react";
import axios from "axios";
//import Skycons from "react-skycons";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import ReactAnimatedWeather from "react-animated-weather";

//const Skycons = require("skycons")(window);

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: []
    };
  }

  componentDidMount() {
    this.getForecast();
  }

  getForecast() {
    axios
      .get(`api/forecast`)
      .then(res => {
        console.log(res.data);

        this.setState({
          forecast: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let { forecast } = this.state;
   
    return (
      <Row>
        {forecast.map((forecast, i) => (
          <Col xs={12} key={i}>
            <Row className="Forecast-row justify-content-end text-center align-items-center">
              {/* Convert unix time */}
              <Col xs={1} className="p-0">
                {moment.unix(forecast.time).format("ddd")}
              </Col>
              {/* <Col xs={3} className="p-0">{() => this.setIcon(i)}</Col> */}
              <Col xs={2} className="p-0">
                <ReactAnimatedWeather
                  icon={forecast.icon.replace(/-/g, "_").toUpperCase()}
                  color='white'
                />
              </Col>
              <Col xs={2} className="p-0">
                {forecast.temperatureHigh}&deg;F
              </Col>
              <Col xs={2} className="p-0">
                {forecast.temperatureLow}&deg;F
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    );
  }
}

export default Forecast;
