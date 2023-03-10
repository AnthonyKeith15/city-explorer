import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {display_name: 'Choose Your City', lat: 'East/West Coordinates', lon: 'North/South Coordinates'},
      cityName: '',
      latitude: '',
      longitude: '',
      isMapOpen: false,
      error: false,
      errorMessage: '',
    }
  }

  handleChange = (e) => {
    this.setState
    ({
      cityName: e.target.value,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let myData = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`)
      this.setState({
        cityData: myData.data[0],
        latitude: this.state.cityData.lat,
        longitude: this.state.cityData.lon,
        isMapOpen: true
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `Error: ${error.response.status}`
      })
    }

}
  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`

    return (
      <>
      <Form onSubmit={this.handleSubmit}>
        <Form.Label for="cityName">Choose a City</Form.Label>
        <Form.Control id="cityName" type="text" onChange={this.handleChange}></Form.Control>
        <Button type='submit'>Explore!</Button>
      </Form>
      <Card>
        <Card.Img src={mapURL} alt="Map of Chosen City" style={this.state.isMapOpen ? {} : { display: 'none' }} ></Card.Img>
        <Card.Body>
        <Card.Title>{`City: ${this.state.cityData.display_name}`}</Card.Title>
        <Card.Text>{`Latitude: ${this.state.cityData.lat}`}</Card.Text>
        <Card.Text>{`Longitude: ${this.state.cityData.lon}`}</Card.Text>
        </Card.Body>
      </Card>
      </>
  
    );

  }
}

export default App;
