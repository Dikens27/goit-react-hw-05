import { useEffect, useState } from 'react';
import SearchForm from '../components/searchForm/SearchForm';
import { searchMovie } from '../movies-api';
import MovieList from '../components/movieList/MovieList';
import Loader from '../components/loader/Loader';
import { ErrorMessage } from 'formik';
import LoadMoreBtn from '../components/loadMoreBtn/LoadMoreBtn';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  const filmSearch = params.get('query') ?? '';

  const handleSearch = inputQuery => {
    setPage(1);
    setMovies([]);
    params.set('query', inputQuery);
    setParams(params);
  };

  useEffect(() => {
    if (filmSearch === '') {
      return;
    }

    const pullRequest = async () => {
      try {
        setLoader(true);
        const response = await searchMovie(filmSearch, page);
        setMovies(prevMovie => {
          return [...prevMovie, ...response.results];
        });
        setShowBtn(
          response.total_pages !== page && response.results.length > 0
        );
      } catch (e) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    pullRequest();
  }, [filmSearch, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
      {showBtn && !loader && !error && <LoadMoreBtn onClick={handleLoadMore} />}
      {loader && <Loader />}
    </div>
  );
}
