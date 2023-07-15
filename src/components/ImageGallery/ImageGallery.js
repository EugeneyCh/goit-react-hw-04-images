import { useEffect, useState } from 'react';
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
  console.log('Props searchQuery is ', searchQuery);

  const createSearchOptions = searchQuery => {
    const BASE_URL = 'https://pixabay.com/api/';
    const My_API_key = '35792081-ad86e3eac8072124d950161bb';
    // console.log('SearchQuerry in line 20 is', searchQuery);

    const options = new URLSearchParams({
      key: My_API_key,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 12,
    });
    // console.log('SearchQuerry is', searchQuery);
    // console.log('Query word is:', BASE_URL + `?` + options.toString());
    return BASE_URL + `?` + options.toString();
  };

  const getFetchImages = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(createSearchOptions(searchQuery));
      const newPictures = data.hits;
      // console.log('New pictures');
      setTotalCount(data.totalHits);
      setPictures(prevPictures => [...prevPictures, ...newPictures]);
      // console.log('Pictures in state', pictures);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickLoadMore = () => {
    setIsLoading(true);
    setCurrentPage(currentPage + 1);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Checking searchQuery to empty query
    if (searchQuery.trim() === '') {
      // console.log('Checked to empty ', searchQuery);
      return;
    }
    // console.log('Changed  current page');
    // console.log('Changed searchQuerry', searchQuery);
    setCurrentPage(1);
    setPictures([]);
    // setCurrentPage(prevPage => {
    //   if (prevPage !== 1) {
    //     return 1;
    //   }
    //   return prevPage;
    // });
    console.log('Current Page must be 1', 'Page is', currentPage);

    // console.log('Render new querry', searchQuery);
    // console.log(searchQuery);
    setIsLoading(true);

    getFetchImages(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 1) {
      getFetchImages(searchQuery);
      // console.log('Render next page', currentPage);
      // console.log(searchQuery);
    }
    // console.log('Changed  current page', currentPage);
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
