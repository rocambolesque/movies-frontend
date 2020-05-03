import React, { Component } from 'react';
import './Movie.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MovieService from '../../services/MovieService.js';


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
        this.setState({movie: movie})
      })
  }

  render() {
		return (
			<div>
				<Formik
					initialValues={{
            rating: this.props.rating,
            id: this.props.id
          }}
					onSubmit={(values, { setSubmitting }) => {
            let movieService = new MovieService();
            movieService.updateMovieRating(values.id, values.rating)
                .then(res => {
                    setSubmitting(false);
                    console.log(res);
                    alert('done');
                })
                .catch(error => {
                    setSubmitting(false);
                    console.log(error);
                    alert(error.response.data.error);
                })
					}}
        >
				{({ isSubmitting }) => (
					<Form>
						<Field name="id" type="hidden" />
            <div className="movieTitle">
              {this.state.movie.Title}
            </div>
            <img src={this.state.movie.Poster} alt="poster" className="moviePoster" />
            <div>
              { this.state.movie.Ratings.map((rating, i) => {
                return (
                  <div key={rating.Source}>
                    {rating.Source}: {rating.Value}
                  </div>
                )
              })}
            </div>
						<Field name="rating" />
						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
        </Formik>
			</div>
		);
  }
}

export default Movie; // Don’t forget to use export default!
