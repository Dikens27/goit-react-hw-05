import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../movies-api';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const getMoviesData = async () => {
      try {
        const response = await getReviews(movieId);

        setReviews(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMoviesData();
  });

  return (
    <div>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => {
            return (
              <li key={review.id}>
                <p>
                  Author:
                  <span>{review.author}</span>
                </p>
                <p>{review.content}</p>
              </li>
            );
          })
        ) : (
          <p>This movie has no reviews</p>
        )}
      </ul>
    </div>
  );
}
