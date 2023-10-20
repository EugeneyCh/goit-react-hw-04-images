import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';
import { useGetFetchImages } from 'components/Hooks/hooks';

function ImageGallery({ searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickLoadMore = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  // Еще вариант - пробросил функцию очистки в хук
  const clearPages = () => {
    setCurrentPage(() => 1);
  };

  const [pictures, isLoading, hasNextPage] = useGetFetchImages(
    searchQuery,
    currentPage,
    clearPages
  );

  const toggleModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <ul className={css.imageGallery}>
        {pictures &&
          pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              image={picture.webformatURL}
              onClick={() => {
                setSelectedImage(picture.largeImageURL);
              }}
            />
          ))}
      </ul>

      {isLoading && <Loader />}

      {!isLoading && pictures && hasNextPage && (
        <button
          type="button"
          className={css.button}
          onClick={handleClickLoadMore}
        >
          Load More
        </button>
      )}

      {selectedImage && <Modal image={selectedImage} onClose={toggleModal} />}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
