import React, { Component } from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';

const movieList = [
	{
		"title": "Whiplash",
		"rating": "5/5",
	},
	{
		"title": "Drive",
		"rating": "5/5",
	}
]

class MovieList extends Component {
  render() {
		return (
			<div>
				{ movieList.map((movie, i) => {
					return (
						<Movie title={movie.title} rating={movie.rating} />
					)
				})}
			</div>
		);
  }
}

export default MovieList; // Don’t forget to use export default!
