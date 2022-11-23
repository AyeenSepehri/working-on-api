import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchDataHandler = async () => {
    setIsLoading(true)
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedData = data.results.map(
      (movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        }
      }
    )
    setMovie(transformedData)
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movie.length === 0 && <p>movie not found!</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && movie.length > 1 && <MoviesList movies={movie} />}
      </section>
    </React.Fragment>
  );
}

export default App;
