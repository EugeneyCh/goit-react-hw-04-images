import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ keyItem, image, onClick }) {
/**
 * нет необходимости принимать props keyItem
 * он не передается в компонент от родителя = 'undefined'
 *
*/
  return (
    <li key={keyItem} className={css.galleryItem} onClick={onClick}>
      <img src={image} alt={image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  keyItem: PropTypes.number,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
