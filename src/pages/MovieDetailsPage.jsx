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
import { IoArrowUndoOutline } from 'react-icons/io5';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);
  const [urlPath, setUrlPath] = useState('');
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
        window.alert('Error. Please reload the page');
      } finally {
        setLoader(false);
      }
    };
    getMoviesData();
  }, [movieId]);

  return (
    <div className={css.bigContainer}>
      <div className={css.linkContainer}>
        <Link className={css.goBack} to={backLinkRef.current}>
          <IoArrowUndoOutline />
          <span className={css.spanGoBack}>Go back</span>
        </Link>
      </div>
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

      <h2>Additoinal information</h2>

      <ul>
        <li>
          <NavLink className={css.information} to="cast">
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink className={css.information} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />

      <hr />
    </div>
  );
}
