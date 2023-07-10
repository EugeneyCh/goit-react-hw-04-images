import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ key, image, onClick }) {
  return (
    <li key={key} className={css.galleryItem} onClick={onClick}>
      <img src={image} alt={image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  key: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
