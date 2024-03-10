import { Link } from 'react-router-dom';

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.Id}`}>
              <p>{movie.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
