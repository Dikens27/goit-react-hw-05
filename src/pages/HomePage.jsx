import { useState, useEffect } from 'react';
import MovieList from '../components/movieList/MovieList';
import { getMovies } from '../movies-api';
import { ErrorMessage } from 'formik';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (e) {
        setError(true);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Tranding today</h1>
      <MovieList movies={movies} />
      {error && <ErrorMessage />}
    </div>
  );
}
