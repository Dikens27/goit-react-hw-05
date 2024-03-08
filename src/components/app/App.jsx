// import css from './App.module.css';
import { useEffect, useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import ImageGallery from '../imageGallery/ImageGallery';
import { fetchImages } from '../../rest-api';
import { Toaster } from 'react-hot-toast';
import Loader from '../loader/Loader';
import ErorMessage from '../errorMessage/ErrorMessage';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import ImageModal from '../imageModal/ImageModal';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      try {
        setIsLoading(true);
        setError(false);
        const { imageData, totalPages } = await fetchImages(query, page);

        setImages(prevImages => {
          return [...prevImages, ...imageData];
        });

        setShowBtn(totalPages !== page && imageData.length > 0);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const handleSearch = async newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleOpen = value => {
    setIsOpen(true);
    setContent(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onOpen={handleOpen} />
      )}
      {showBtn && !isLoading && !error && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {error && <ErorMessage />}
      <ImageModal isOpen={isOpen} onClose={handleClose} content={content} />
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}
