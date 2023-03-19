import React from 'react';
import './App.css';
import axios from 'axios'
import SearchResults from './SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityObject: {},
      cityLat: '',
      cityLon: '',
      weatherObject: [],
      movieObjectArr: [],
    }
    // TODO ORGANIZE DATA ON FRONT END
    this.handleCityChoiceChange = (e) => {
      this.setState({
        searchQuery: e.target.value
      })
      
    }



    this.handleFormSubmit = async (e) => {
      e.preventDefault();
      this.getCityObject();
      // weatherFunction
      this.getMovieObject();

    
  }

  this.getCityObject = async () => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/city?city=${this.state.searchQuery}`
      let cityObjectData = await axios.get(url)
      this.setState({
        cityObject: cityObjectData.data,
        cityLat: cityObjectData.data.lat,
        cityLon: cityObjectData.data.lon
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
    }catch(error){
      console.log(error.message);
    }
  }
  this.getWeatherObject = async (lat, lon) => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
      let weatherObjectData = await axios.get(url)
      this.setState({
        weatherObject: weatherObjectData.data
      })
      console.log(weatherObjectData.data)
    }catch(error){
      console.log(error.message);
    }
  }

  // function to get weather info




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
        <SearchResults cityName={this.state.cityObject.name} lat={this.state.cityLat} lon={this.state.cityLon}/>
      </>
    )
  }
}

export default App;
