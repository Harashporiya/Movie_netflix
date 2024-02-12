import { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState([]);

  const setProduct = (details) => {
    setSelectedMovie(details);
  };

  return (
    <MovieContext.Provider value={ {selectedMovie,setProduct }}>
      {children}
    </MovieContext.Provider>
  );
};

export default function useMovieContext() {
  const context = useContext(MovieContext);
  return context
}
