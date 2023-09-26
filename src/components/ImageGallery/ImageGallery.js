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
  console.log('currentPage is', currentPage);

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
    setCurrentPage(currentPage => currentPage + 1);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    // console.log('Changed  current page');
    console.log('Changed searchQuerry', searchQuery);

    // if (prevProps.searchQuerry !== this.props.searchQuerry) {
    //   this.setState({ currentPage: 1, pictures: [] }, () => {
    //     this.getFetchImages();
    //     // console.log('Render new query');
    //   });
    setCurrentPage(() => 1);
    setPictures([]);
    // setCurrentPage(prevPage => {
    //   if (prevPage !== 1) {
    //     return 1;
    //   }
    //   return prevPage;
    // });
    console.log('Current Page must be 1', 'Page is', currentPage);

    setIsLoading(true);

    // getFetchImages(searchQuery);

    const fetchData = async () => {
      await getFetchImages(searchQuery);
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 1) {
      getFetchImages(searchQuery);
    }
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
