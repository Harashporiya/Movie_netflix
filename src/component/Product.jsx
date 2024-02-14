import React, { useEffect, useState } from 'react';
import './product.css';
import useMovieContext from './MovieContext';
import Navbar from './Navbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Product = () => {
  const { selectedMovie } = useMovieContext();
  const [trailer, setTrailer] = useState("");
  const [actors, setActors] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchMovieId = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=3f749f61b1eb4a06ce307ceb0bad47be`);
      const data = await response.json();
      setTrailer(data.results[0]?.key || "");
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  }

  const fetchActors = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?api_key=3f749f61b1eb4a06ce307ceb0bad47be`);
      const data = await response.json();
      setActors(data.cast || []);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  }

  const handleWatchTrailer = () => {
    setShowTrailer(true);
  }

  const handleHiddenTrailer = () => {
    setShowTrailer(false);
  }

  useEffect(() => {
    if (selectedMovie) {
      fetchMovieId();
      fetchActors();
    }
  }, [selectedMovie]);

  return (
    <>
      <Navbar />
      <div id="product">
        {selectedMovie && (
          <>
            <div>
              <img id="product_img" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
            </div>
            <div id="container_img">
              <div id="watch_text">
                <h2 id="product_title">{selectedMovie.title}</h2>
                <p id="product_release_date" variant="contained">Release Date: {selectedMovie.release_date}</p>
                {Array(Math.floor(selectedMovie.vote_average / 1.7)).fill('⭐️').join(' ')}
                <p id="product_overview"><b id="b_overview">Overview:</b> {selectedMovie.overview}</p>
                <Stack spacing={2} direction="row">
                  <Button onClick={handleWatchTrailer} variant="contained">Watch Trailer</Button>
                  <Button onClick={handleHiddenTrailer} variant="outlined">Remove Trailer</Button>
                </Stack>
              </div>

              <div id="actor_profile">
                {actors.map(actor => (
                  <div key={actor.id}>
                    <img id="actors_img" src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={`${actor.name} Poster`} />
                    <h1 id="actor_name">{actor.name}</h1>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {showTrailer && (
        <div className="screen-trailer">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube video player"
            frameBorder="2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Product;
