import { useState, useEffect } from 'react';
import MovieList from '../components/movieList/MovieList';
import { getMovies } from '../movies-api';
import Loader from '../components/loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const data = await getMovies();
        setMovies(data);
      } catch (e) {
        window.alert('Error. Please reload the page');
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Tranding today</h1>
      {loader && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
}
