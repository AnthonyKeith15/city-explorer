import React from "react";

class WeatherForecast extends React.Component {
  render() {
    const { weatherArr } = this.props;

    // Render a message if weatherArr is undefined or empty
    if (!weatherArr || weatherArr.length === 0) {
      return <p>No forecast data available</p>;
    }

    return (
      <div>
        <h2>Weather Forecast</h2>
        {weatherArr.map((day, index) => (
          <Weather key={index} date={day.date} high={day.high} low={day.low} />
        ))}
      </div>
    );
  }
}


class Weather extends React.Component {
  render() {
    const { date, high, low } = this.props;
    return (
      <div>
        <h3>{date}</h3>
        <p>High: {high}°C</p>
        <p>Low: {low}°C</p>
      </div>
    );
  }
}


export default WeatherForecast;
