import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import AuthService from './AuthService.js';

class MovieService {
  getClient() {
    let authService = new AuthService();
    return new ApolloClient({
      uri: 'https://rocambolesque-movies.herokuapp.com/v1/graphql',
      headers: authService.getAuthHeaders()
    });
  }

  async getMovies() {
    return this.getClient()
      .query({
        query: gql`
          {
            movie {
              id
              title
              rating
            }
          }
        `,
        variables: null
      })
  }

  async updateMovieRating(id, rating) {
    return this.getClient()
      .mutate({
        mutation: gql`
          mutation update_movie($id:Int!, $rating:Int!) {
            update_movie(where: {id: {_eq: $id}}, _set: {rating: $rating}) {
              returning {
                id
                title
                rating
              }
            }
          }
        `,
        variables: {
            id: id,
            rating: rating
        }
      })
    }

  async addMovie(title, rating) {
    return this.getClient()
      .mutate({
        mutation: gql`
          mutation insert_movie($title:String!, $rating:Int!) {
            insert_movie(objects: {rating: $rating, title: $title}) {
              returning {
                id
                title
                rating
              }
            }
          }
        `,
        variables: {
            title: title,
            rating: rating
        }
      })
    }
}

export default MovieService;
