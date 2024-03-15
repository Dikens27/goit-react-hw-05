import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMoviesbyId, getImagePath } from '../movies-api';
import css from './MovieDetailsPage.module.css';
import Loader from '../components/loader/Loader';
import { ErrorMessage } from 'formik';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);
  const [urlPath, setUrlPath] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const getMoviesData = async () => {
      try {
        setLoader(true);
        const response = await getMoviesbyId(movieId);
        const imagePath = await getImagePath();
        const { base_url, backdrop_sizes } = imagePath;
        const imageUrl = `${base_url}${backdrop_sizes[0]}`;

        setInfo(response);
        setUrlPath(imageUrl);
      } catch (e) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getMoviesData();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      {loader && <Loader />}
      {info && (
        <div className={css.container}>
          <img src={`${urlPath}${info.poster_path}`} alt={info.title} />

          <div className={css.miniContainer}>
            <h1>
              {info.title} {`(${info.release_date.substring(0, 4)})`}
            </h1>
            <p>User Score: {Math.floor((info.vote_average / 10) * 100)}%</p>
            <h2>Owerview</h2>
            <p className={css.overview}>{info.overview}</p>
            <h3>Genres</h3>
            <ul className={css.genresList}>
              {info.genres &&
                info.genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
            </ul>
          </div>
        </div>
      )}

      <hr />

      <p>Additoinal information</p>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Outlet />

      <hr />
      {error && <ErrorMessage />}
    </div>
  );
}
