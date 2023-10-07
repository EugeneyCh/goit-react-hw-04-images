import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';
import { useGetFetchImages } from 'components/Utilities/hooks';

function ImageGallery({ searchQuery }) {
  // const [pictures, setPictures] = useState([]);
  // const [totalCount, setTotalCount] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  // console.log('Props searchQuery is ', searchQuery);
  // console.log('currentPage is', currentPage);

  const handleClickLoadMore = () => {
    // setIsLoading(true);
    setCurrentPage(currentPage => currentPage + 1);
  };
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [searchQuery]);

  const [pictures, isLoading, totalCount] = useGetFetchImages(
    searchQuery,
    currentPage
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

      {!isLoading && pictures && totalCount - (currentPage - 1) * 12 >= 12 && (
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
