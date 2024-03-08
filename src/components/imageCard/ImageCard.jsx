import css from './ImageCard.module.css';

export default function ImageCard({
  onOpen,
  imageCard,
  data: {
    likes,
    description,
    urls: { small },
    user: { last_name },
  },
}) {
  return (
    <div className={css.container}>
      <img
        src={small}
        alt={description}
        onClick={() => onOpen(imageCard)}
        className={css.image}
      />
      <div className={css.content}>
        <div className={css.title}>
          <p className={css.titleItem}>
            Likes: <span className={css.titleText}>{likes}</span>
          </p>
          <p className={css.titleItem}>
            Author: <span className={css.titleText}>{last_name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
