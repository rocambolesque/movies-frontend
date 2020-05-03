import React, { Component } from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import MovieService from '../../services/MovieService';

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
                        <Movie key={movie.id} id={movie.id} title={movie.title} rating={movie.rating} />
                   )
                })}
            </div>
       );
    }
}

export default MovieList; // Don’t forget to use export default!
