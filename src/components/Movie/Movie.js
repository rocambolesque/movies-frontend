import React, { Component } from 'react';
import './Movie.css';
import axios from 'axios';


class Movie extends Component {
	state = {
		movie: {
      Ratings: []
    },
	}

	componentDidMount() {
    axios.get(`${process.env.REACT_APP_MOVIE_API_URL}&t=${this.props.title}`)
      .then(res => {
        let movie = res.data
        movie.Ratings = [...movie.Ratings, {"Source": "Me", "Value": this.props.rating}]
        this.setState({movie: movie})
      })
  }

  render() {
		return (
			<div>
          <div className="Movie-title">
            {this.state.movie.Title}
          </div>
          <div>
            { this.state.movie.Ratings.map((rating, i) => {
              return (
                <div key={rating.Source} className="Movie-ratings">
                  {rating.Source}: {rating.Value}
                </div>
              )
            })}
          </div>
          <img src={this.state.movie.Poster} alt="movie poster"/>
			</div>
		);
  }
}

export default Movie; // Don’t forget to use export default!
