import React from 'react';
import './App.css';
import axios from 'axios'
import SearchResults from './SearchResults';
import MovieResults from './MovieResults';
import WeatherForecast from './WeatherResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityObject: {},
      cityLat: '',
      cityLon: '',
      weatherObjectArr: [],
      movieObjectArr: [],
      weatherURL: ''
    }
    // TODO ORGANIZE DATA ON FRONT END
    this.handleCityChoiceChange = (e) => {
      this.setState({
        searchQuery: e.target.value
      })
      
    }



    this.handleFormSubmit = async (e) => {
      e.preventDefault();
      // getWeatherObject gets invoked during cityObject to pass lat and lon as parameters
      this.getCityObject();
      this.getMovieObject();

    
  }

  this.getCityObject = async () => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/city?city=${this.state.searchQuery}`
      let cityObjectData = await axios.get(url)
      this.setState({
        cityObject: cityObjectData.data,
        cityLat: cityObjectData.data.lat,
        cityLon: cityObjectData.data.lon,
        weatherURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityObjectData.data.lat},${cityObjectData.data.lon}&zoom=12`
      })
      this.getWeatherObject(cityObjectData.data.lat, cityObjectData.data.lon);

    }catch(error){
      console.log(error.message);
    }
  }

  this.getMovieObject = async () => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/movie?city=${this.state.searchQuery}`
      let movieObjectData = await axios.get(url)
      this.setState({
        movieObjectArr: movieObjectData.data
      })
      console.log(movieObjectData)
    }catch(error){
      console.log(error.message);
    }
  }
  this.getWeatherObject = async (lat, lon) => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
      let weatherObjectData = await axios.get(url)
      this.setState({
        weatherObjectArr: weatherObjectData.data
      })
      console.log(weatherObjectData.data)
    }catch(error){
      console.log(error.message);
    }
  }





}
  
  
  render() {
    return (
      <>

        <form onSubmit={this.handleFormSubmit}>
          <label for='userCityChoice'>Choose A City
            <input type='text' id='userCityChoice' onChange={this.handleCityChoiceChange}></input>
          </label>
          <button type='submit'>Let's Go</button>
        </form>
        <SearchResults cityName={this.state.cityObject.name} lat={this.state.cityLat} lon={this.state.cityLon} imageSrc={this.state.weatherURL}/>
        {this.state.movieObjectArr.length > 0 && <MovieResults movieArr={this.state.movieObjectArr} />}
        {this.state.weatherObjectArr && this.state.weatherObjectArr.length > 0 && <WeatherForecast weatherArr={this.state.weatherObjectArr} />}
      </>
    )
  }
}

export default App;
