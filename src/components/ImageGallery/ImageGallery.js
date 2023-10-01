import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import { createSearchOptions } from 'components/Utilities/utilities';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';

function ImageGallery({ searchQuery, firstPage }) {
  const [pictures, setPictures] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  // console.log('Props searchQuery is ', searchQuery);
  // console.log('currentPage is', currentPage);

  const getFetchImages = async (query, currPage) => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(createSearchOptions(query, currPage));
      const newPictures = data.hits;
      setTotalCount(data.totalHits);
      setPictures(prevPictures => [...prevPictures, ...newPictures]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickLoadMore = () => {
    setIsLoading(true);
    setCurrentPage(currentPage => currentPage + 1);
  };

  const element = document.documentElement;

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    setCurrentPage(1);
    setPictures([]);
    setIsLoading(true);
    getFetchImages(searchQuery, 1);
    element.scrollTop = 10;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 1) {
      getFetchImages(searchQuery, currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
