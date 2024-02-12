import React from 'react';
import './product.css';
import useMovieContext from './MovieContext';
import Navbar from './Navbar';

const Product = () => {
  const { selectedMovie } = useMovieContext();
  console.log(selectedMovie)
  return (
    <>
     
        <Navbar/> 
        <div id="product">
        {selectedMovie && (
          <div>
            
            <img id="product_img" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
            <h2 id="product_title">{selectedMovie.title}</h2>
            <p id="product_release_date">Release Date: {selectedMovie.release_date}</p>
            <p id="product_overview">{selectedMovie.overview}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
