import React from "react";

class SearchResults extends React.Component {
  render() {
    return (
      <>
      
      <p>{this.props.cityName}</p>
      <p>{this.props.lat}</p>
      <p>{this.props.lon}</p>
      </>
    )
  }
}

export default SearchResults