import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?apikey=cc746e87';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('movie');

  const searchMovies = useCallback(async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}&type=${searchType}`);
      
      const data = await response.json();
      if (data && data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  }, [searchType]); // Add `searchType` as a dependency

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    }
    else searchMovies("Batman")
  }, [searchTerm, searchType, searchMovies]); // Add `searchMovies` as a dependency

  return (
    <div className='app'>
      <h1>MovieHub</h1>

      <div className='search'>
        <input 
          placeholder='Search for Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='search-type'>
          <input 
            className='movie-search'
            type='radio' 
            name='type' 
            id='movie' 
            value='movie' 
            checked={searchType === 'movie'} 
            onChange={(e) => setSearchType(e.target.value)}
          /> Movie

          <input 
            className='series-search'
            type='radio' 
            name='type' 
            id='series' 
            value='series' 
            checked={searchType === 'series'} 
            onChange={(e) => setSearchType(e.target.value)}
          /> Series

          <input 
            className='episode-search'
            type='radio' 
            name='type' 
            id='episode' 
            value='episode' 
            checked={searchType === 'episode'} 
            onChange={(e) => setSearchType(e.target.value)}
          /> Episode
        </div>
        <div>
          <img src={SearchIcon} alt='icon' onClick={() => searchMovies(searchTerm)} />
        </div>
      </div>
      {movies.length > 0 ? (
        <div className='container'>
          {movies.map((movie, idx) => (
            <MovieCard movie={movie} key={idx} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No {searchType} found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
