import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCredits, getImagePath } from '../../movies-api';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [urlPath, setUrlPath] = useState('');

  useEffect(() => {
    if (!movieId) {
      return;
    }

    const getCastsData = async () => {
      try {
        const response = await getCredits(movieId);
        const imagePath = await getImagePath();
        const { base_url, logo_sizes } = imagePath;
        const imageUrl = `${base_url}${logo_sizes[2]}`;

        setCasts(response);
        setUrlPath(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCastsData();
  }, [movieId]);

  return (
    <div>
      <img src="" alt="" />
      <ul className={css.list}>
        {casts.length > 0 ? (
          casts.map(cast => {
            return (
              <li className={css.item} key={cast.cast_id}>
                <img src={`${urlPath}${cast.profile_path}`} alt={cast.name} />
                <div>
                  <p>{cast.name}</p>
                  <p>Character:</p>
                  <p>{cast.character}</p>
                </div>
              </li>
            );
          })
        ) : (
          <p>This movie has no casts</p>
        )}
      </ul>
    </div>
  );
}
