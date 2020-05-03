import React, { Component } from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import MovieService from '../../services/MovieService';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function getListChunks(list, chunkSize) {
  let pos = 0;
  let result = [];
  console.log(list);
  while(pos < list.length) {
    result.push(list.slice(pos, pos+chunkSize));
    pos+=chunkSize;
  }
  return result;
}

class MovieList extends Component {
  state = {
    movieList: [],
    movieListChunks: []
  }

  componentDidMount() {
    const movieService = new MovieService();
    movieService.getMovies()
      .then(res => {
        this.setState({movieList: res.data.movie})
        this.setState({movieListChunks: getListChunks(res.data.movie, 4)})
      })
  }

  render() {
    return (
      <div>
        {
          this.state.movieListChunks.map((chunk, index) => (
            <div className="row" key={index}>
            {
              chunk.map((movie, index) => (
                <div className="col" key={index}>
                  <Movie key={movie.id} title={movie.title} rating={movie.rating} />
                </div>
              ))
            }
            </div>
          ))
        }
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
