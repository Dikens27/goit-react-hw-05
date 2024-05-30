import { useEffect, useState } from 'react';
import SearchForm from '../components/searchForm/SearchForm';
import { getImagePath, searchMovie } from '../movies-api';
import MovieList from '../components/movieList/MovieList';
import Loader from '../components/loader/Loader';
import LoadMoreBtn from '../components/loadMoreBtn/LoadMoreBtn';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [urlPath, setUrlPath] = useState('');

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
        const imagePath = await getImagePath();
        const { base_url, backdrop_sizes } = imagePath;
        const imageUrl = `${base_url}${backdrop_sizes[1]}`;
        setUrlPath(imageUrl);
        setMovies(prevMovie => {
          return [...prevMovie, ...response.results];
        });
        setShowBtn(
          response.total_pages !== page && response.results.length > 0
        );
      } catch (e) {
        window.alert('Error. Please reload the page');
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
      <MovieList movies={movies} urlPath={urlPath} />
      {showBtn && !loader && <LoadMoreBtn onClick={handleLoadMore} />}
      {loader && <Loader />}
    </div>
  );
}
