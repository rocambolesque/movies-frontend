import React, { Component } from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import MovieService from '../../services/MovieService';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class MovieList extends Component {
  state = {
    movieList: []
  }

  componentDidMount() {
    const movieService = new MovieService();
    movieService.getMovies()
      .then(res => {
        this.setState({movieList: res.data.movie})
      })
  }

  render() {
    return (
      <div>
        { this.state.movieList.map((movie, i) => {
          return (
            <Movie key={movie.id} title={movie.title} rating={movie.rating} />
          )
        })}
				<Formik
					initialValues={{
            rating: '',
            title: ''
          }}
					onSubmit={(values, { setSubmitting }) => {
            let movieService = new MovieService();
            movieService.addMovie(values.title, values.rating)
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
						<Field name="title" />
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

export default MovieList; // Don’t forget to use export default!
