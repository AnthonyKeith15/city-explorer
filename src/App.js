import React from 'react';
import './App.css';
import axios from 'axios'
import SearchResults from './SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCityChoice: '',
      userCityData: [],
      userCityDataName: '',
      userCityDataLat: '',
      userCityDataLon: '',
      cityMapURL: '',
      weatherData: '',
      isError: false,
    }
  
    this.handleCityChoiceChange = (e) => {
      this.setState({
        userCityChoice: e.target.value
      })
    }



    this.handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        // let weatherData = await axios.get(`${process.env.REACT_APP_SERVER}/?city=${this.state.userCityChoice}`);

        let userCityChoiceData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.userCityChoice}&format=json`);

        let movieData = await axios.get(`${process.env.REACT_APP_SERVER}/movie?movieSearch=${this.state.userCityChoice}`)


        this.setState({
          // weatherData: weatherData.data,
          userCityData: userCityChoiceData.data[0],
          userCityDataName: userCityChoiceData.data[0].display_name,
          userCityDataLat: userCityChoiceData.data[0].lat,
          userCityDataLon: userCityChoiceData.data[0].lon,
        })
        console.log(movieData);
      } catch (error) {
        alert(`Sorry, you have an error of ${error.response.status}`)
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
        <SearchResults city={this.state.userCityDataName} lat={this.state.userCityDataLat} lon={this.state.userCityDataLon} />
      </>
    )
  }
}

export default App;
