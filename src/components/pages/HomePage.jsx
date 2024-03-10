import { useState, useEffect } from 'react';
import MovieList from '../movieList/MovieList';
import { getMovies } from '../../movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}
