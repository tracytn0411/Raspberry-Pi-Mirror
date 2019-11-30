import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import ReactAnimatedWeather from "react-animated-weather";
import { WiStrongWind, WiHumidity } from "react-icons/wi";

import "../containers/Display.css";

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      today: {},
      icon: "",
      city: "",
      state: ""
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
          forecast: res.data.daily,
          today: res.data.current,
          icon: res.data.currentIcon,
          city: res.data.currentCity,
          state: res.data.currentState
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let { forecast, today, icon, city, state } = this.state;

    return (
      <>
        <Row className="Weather-row justify-content-end text-center align-items-center text-right">
          <Col xs={4} className="Weather-info">
            <Row>
              <Col>
                <WiStrongWind />
                {today.windSpeed}
              </Col>
              <Col>
                <WiHumidity />
                {today.humidity}
              </Col>
            </Row>
          </Col>

          <Col xs={12}>
            <Row className="Weather-icon justify-content-end text-center align-items-center text-right">
              <Col xs={2}>
                <ReactAnimatedWeather icon={icon} color="white" />
              </Col>
              <Col xs={2}>{Math.round(today.apparentTemperature)}&deg;</Col>
            </Row>
          </Col>
        </Row>

        <Row className="Forecast-row justify-content-end text-center align-items-center">
          <Col xs={4} className="Forecast-location d-flex">
            <div className="mr-auto p-0">Forecast</div>
            <div>{city}, </div>
            <div>{state}</div>
          </Col>
          {forecast.map((forecast, i) => (
            <Col xs={12} key={i}>
              <Row className="Forecast-day justify-content-end text-center align-items-center">
                {/* Convert unix time */}
                <Col xs={1} className="p-0">
                  {moment.unix(forecast.time).format("ddd")}
                </Col>
                {/* <Col xs={3} className="p-0">{() => this.setIcon(i)}</Col> */}
                <Col xs={1} className="p-0">
                  <ReactAnimatedWeather
                    icon={forecast.icon.replace(/-/g, "_").toUpperCase()}
                    color="white"
                  />
                </Col>
                <Col xs={1} className="p-0 tempHigh">
                  {Math.round(forecast.temperatureHigh)}&deg;
                </Col>
                <Col xs={1} className="p-0 tempLow">
                  {Math.round(forecast.temperatureLow)}&deg;
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default Forecast;
