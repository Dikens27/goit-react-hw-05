import css from './ImageGallery.module.css';
import ImageCard from '../imageCard/ImageCard';

export default function ImageGallery({ images, onOpen }) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard data={image} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
