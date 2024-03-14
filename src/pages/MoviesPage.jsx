import { useEffect, useState } from 'react';
import SearchForm from '../components/searchForm/SearchForm';
import { searchMovie } from '../movies-api';
import MovieList from '../components/movieList/MovieList';
import Loader from '../components/loader/Loader';
import { ErrorMessage } from 'formik';
import LoadMoreBtn from '../components/loadMoreBtn/LoadMoreBtn';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  const handleSearch = inputQuery => {
    setPage(1);
    setMovies([]);
    setQuery(inputQuery);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const pullRequest = async () => {
      try {
        setLoader(true);
        const response = await searchMovie(query, page);
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
  }, [query, page]);

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
