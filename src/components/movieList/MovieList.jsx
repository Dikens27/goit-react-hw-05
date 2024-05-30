import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies, urlPath }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map(movie => {
        return (
          <li className={css.movie} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <div>
                <img
                  className={css.img}
                  width={400}
                  src={`${urlPath}${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className={css.filmTitle}>
                {movie.title} {`(${movie.release_date.substring(0, 4)})`}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
