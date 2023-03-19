import React from "react";

class MovieResults extends React.Component {
  render() {
    const { movieArr } = this.props;

    // Render a message if the array is empty
    if (movieArr.length === 0) {
      return <p>No movies found</p>;
    }

    return (
      <div>
        <h2>Movies About Your City</h2>
        {movieArr.map((movie, index) => (
          <Movie key={index} title={movie.title} description={movie.description} />
        ))}
      </div>
    );
  }
}

class Movie extends React.Component {
  render() {
    const { title, description } = this.props;
    return (
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}


export default MovieResults;
