import { useState, useEffect } from 'react';
import MovieList from '../components/movieList/MovieList';
import { getImagePath, getMovies } from '../movies-api';
import Loader from '../components/loader/Loader';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [urlPath, setUrlPath] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const data = await getMovies();
        const imagePath = await getImagePath();
        const { base_url, backdrop_sizes } = imagePath;
        const imageUrl = `${base_url}${backdrop_sizes[1]}`;
        setUrlPath(imageUrl);
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
    <div className={css.container}>
      <h1>Trending today</h1>
      {loader && <Loader />}
      <MovieList movies={movies} urlPath={urlPath} />
    </div>
  );
}
