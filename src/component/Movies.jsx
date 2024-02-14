import React, { useState, useEffect} from 'react';
import './movie.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import useMovieContext  from './MovieContext';


function Movies () {
  const [movieData, setMovieData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const navigate = useNavigate();
  const { setProduct } = useMovieContext();


  const fetchTrendingMovies = () => {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=3f749f61b1eb4a06ce307ceb0bad47be")
      .then(res => res.json())
      .then(json => setMovieData(json.results))
      .catch(error => console.error("Error", error));
  }

  const fetchSearchedMovies = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3f749f61b1eb4a06ce307ceb0bad47be&query=${searchData}`)
      .then(res => res.json())
      .then(json => setMovieData(json.results))
      .catch(error => console.error("Error", error));
  }

  useEffect(() => {
    fetchTrendingMovies();
    
  }, []); 

  useEffect(() => {
    if (searchData.trim() !== '') {
      fetchSearchedMovies();
    } else {
      fetchTrendingMovies();
    }
  }, [searchData]);

  const handleNavigate = (movie) => {
      setProduct(movie);
        navigate('/watch');
  }

  const filteredMovies = movieData.filter(movie => movie.title.toLowerCase().includes(searchData.toLowerCase()));

  return (
    <>
      <div id="img_back">
        <Navbar />
        <p id="movies"><b>Unlimited films, TV programmes and more</b></p>
        <p id="watch">Watch anywhere. Cancel at any time.</p>
        <p id="ready">Ready to watch? Search for any movies on watching.</p>
        <div id="input_item">
          <input
            id="input"
            type="text"
            placeholder="Search for a movie"
            value={searchData}
            onChange={(e) => { setSearchData(e.target.value) }}
          />
        </div>
        <div className="movie-container">
          {Array.isArray(filteredMovies) && filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div>
                <img
                  onClick={() => handleNavigate(movie)}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div id="text_name">
                <p id="movie_title">Movie Name: {movie.title}</p>
                <p id="overview">{movie.overview}</p>
                <p id="release_date">Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
               <span id="star"><b>Rating:</b> </span>{Array(Math.floor(movie.vote_average / 1.7)).fill('⭐️').join(' ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Movies;
