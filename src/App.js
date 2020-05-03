import React from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import Auth from './components/Auth/Auth';
import AuthService from './services/AuthService.js';

let authService = new AuthService();

function App() {
  return (
    <div className="App">
		{ !authService.isLoggedIn() && <Auth />}
        { authService.isLoggedIn() && <MovieList />}
    </div>
  );
}

export default App;
