import React, { Component } from "react";

class Weather extends Component {

    constructor() {
        super()
        this.state = {
            temperature: undefined,
            city: undefined,
            // country: undefined,
            // humidity: undefined,
            // description: undefined,
            error: undefined
        }
    }

    componentDidMount() {

        const location = window.navigator && window.navigator.geolocation
        // console.log(location)
        location.getCurrentPosition((data) => {
            console.log(data)
            var lat = data.coords.latitude
            var long = data.coords.longitude
            this.getWeather(lat, long)
        })

    }

    getWeather = async (lat, long) => {
        console.log('hi')
        // e.preventDefault();
        const api_call = await fetch(`http://localhost:5000/weather`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: lat, lon: long })
        });
        console.log(api_call)
        const data = await api_call.json();
        console.log(data);
        this.setState({
            temperature: data.main.temp,
            city: data.name,
            // country: data.sys.country,
            // humidity: data.main.humidity,
            // description: data.weather[0].description,
            error: ""
        })
        console.log(this.state)
    }
    render() {
        return (
            <div>
                {/* <h1>Weather</h1> */}
                <h4>{`Temp: ${this.state.temperature}`}&deg;F</h4>
                <h4>{`City: ${this.state.city}`}</h4>
            </div>

        );
    }
};



export default Weather;