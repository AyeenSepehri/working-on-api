import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {

  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const fetchDataHandler = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("fetch is not ok")
      }
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
    catch (e) {
      setError(true)
      setErrorMessage(e.message)
    }
    setIsLoading(false)
  }

  const addMoviesHandler = (movie) => {
    console.log(movie)
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMoviesHandler}/>
      </section>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movie.length === 0 && !error && <p>movie not found!</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && movie.length > 1 && <MoviesList movies={movie} />}
        {error && !isLoading && <p>{errorMessage}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
