import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { createSearchOptions } from 'components/Utilities/utilities';

export const useGetFetchImages = (
  searchQuery,
  currentPage,
  clearCurrentPages
) => {
  const [pictures, setPictures] = useState([]);
  const [hasNextImage, setHasNextImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearPages = searchQuery => {
    if (searchQuery) {
      setPictures([]);
      clearCurrentPages();
    }
  };

  useMemo(() => clearPages(searchQuery), [searchQuery]);

  const getFetchImages = async (searchQuery, currentPage) => {
    const searchOptions = createSearchOptions(searchQuery, currentPage);

    setIsLoading(true);

    try {
      const { data } = await axios.get(searchOptions);

      const newPictures = data.hits;

      setHasNextImage(data.totalHits - (currentPage - 1) * 12 >= 12);
      setPictures(prevPictures => [...prevPictures, ...newPictures]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    console.log('Query & page equal ', searchQuery, currentPage);
    getFetchImages(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  return [pictures, isLoading, hasNextImage];
};
