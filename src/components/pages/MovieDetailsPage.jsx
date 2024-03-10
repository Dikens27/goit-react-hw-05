import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../movies-api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);
  console.log(movieId);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const getMoviesData = async () => {
      try {
        const response = await fetchMovies(movieId);
        setInfo(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMoviesData();
  }, [movieId]);

  return (
    <div>
      {info && (
        <div>
          <img src="" alt="" />

          <div>
            <h1>{info.title}</h1>
            <p></p>
            <h2></h2>
            <p></p>
            <h3></h3>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
}
