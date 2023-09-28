import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';

function ImageGallery({ searchQuery }) {
  const [pictures, setPictures] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   *
   * @param {*} searchQuery
   * @param {*} currentPage
   * @returns searchUrl
   */
  const createSearchOptions = (searchQuery, currentPage) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const My_API_key = '35792081-ad86e3eac8072124d950161bb';
    const options = new URLSearchParams({
      key: My_API_key,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 12,
    });
    return BASE_URL + `?` + options.toString();
  };

  const searchOptions = createSearchOptions(searchQuery, currentPage);

  const handleClickLoadMore = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  /**
   * clears images array and counter of pages
   * @param {*} searchQuery
   * @returns boolean is search Query
   */
  const clearPages = (searchQuery) => {
    if (searchQuery) {
      setCurrentPage(() => 1);
      setPictures([]);
    }
  };

  /**
   * memo for clearPages
   */
  useMemo(() => clearPages(searchQuery), [searchQuery]);

  /**
   * gets images
   * @param {*} searchOptions
   */
  const getFetchImages = async searchOptions => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(searchOptions);
      const newPictures = data.hits;
      setTotalCount(data.totalHits);
      setPictures(prevPictures => [...prevPictures, ...newPictures]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFetchImages(searchOptions);
  }, [searchOptions]);

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
  )
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
