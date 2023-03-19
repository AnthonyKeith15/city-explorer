import React from "react";

class SearchResults extends React.Component {
  render() {
    return (
      <>
        {this.props.imageSrc && <img src={this.props.imageSrc} alt="a map of your city" />}
        <p>{this.props.cityName}</p>
        <p>{this.props.lat}</p>
        <p>{this.props.lon}</p>
      </>
    )
  }
}

export default SearchResults;
