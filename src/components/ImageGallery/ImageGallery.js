import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import { createSearchOptions } from 'components/Utilities/utilities';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';


/***
 * firstPage - нет необходимости в этом пропсе
 */
function ImageGallery({ searchQuery, firstPage }) {
  const [pictures, setPictures] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  // console.log('Props searchQuery is ', searchQuery);
  // console.log('currentPage is', currentPage);


//* start 1 ********************* */
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
//* end 1 *********************** */



  const handleClickLoadMore = () => {
    setIsLoading(true);
    setCurrentPage(currentPage => currentPage + 1);
  };

  /**
   * Не совсем понятно назначение строки 40, этим действием мы делаем элемент не контролируемым,
   * что не рекомендуется
   */
  const element = document.documentElement;
  console.log(document)

//* start 2 ********************* */

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

//* end 2 *********************** */

/**
 * фрагменты 1 и 2 вынести в отдельный файл и пользовательский хук
 * https://habr.com/ru/companies/otus/articles/729596/
 *
 *
 *  * const [images, isLoading] = useGetImages(searchQuery, currentPage)
 *
 */

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

/**
 * totalCount - (currentPage - 1) * 12 >= 12   =>   currentPage < maxPage
 * maxPage = totalCount % 12 ? totalCount % 12 : Math.ceil(totalCount / 12) + 1
 * maxPage мемоизировать (useMemo))
 *
 * */

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
