import React from "react";

class SearchResults extends React.Component {
  render() {
    return (
      <>
       <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.lat},${this.props.lon}&zoom=12`} alt='A map of your city'></img>
      <p>{this.props.city}</p>
      <p>{this.props.lat}</p>
      <p>{this.props.lon}</p>
      </>
    )
  }
}

export default SearchResults