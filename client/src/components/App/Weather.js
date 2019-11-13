
import React from "react";

const API_KEY = "1444bdaa591bdc020e5c5115de2bacc0";

class Weather extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        // country: undefined,
        // humidity: undefined,
        // description: undefined,
        error: undefined
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

        // e.preventDefault();
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=Imperial`);
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
                <h1>Weather</h1>
                <h4>{`Temperature: ${this.state.temperature}F`}</h4>
                <h4>{`City: ${this.state.city}`}</h4>
            </div>

        );
    }
};



export default Weather;