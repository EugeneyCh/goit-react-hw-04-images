import { useEffect, useMemo, useState } from 'react';
import { createSearchOptions } from 'components/Utilities/utilities';
import axios from 'axios';

export const useGetFetchImages = query => {
  const [pictures, setPictures] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getFetchImages = async (query, currentPage) => {
    console.log('Fetch starting');
    if (!query) {
      //   setPictures([]);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.get(createSearchOptions(query, currentPage));
      const newPictures = data.hits;
      setTotalCount(data.totalHits);
      setPictures(prevPictures => [...prevPictures, ...newPictures]);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const clearPages = () => {
    if (query) {
      console.log('Pictures and startPage were cleaned');
      setCurrentPage(() => 1);
      setPictures([]);
    }
  };
  const nextPages = () => {
    setIsLoading(true);
    setCurrentPage(currentPage => currentPage + 1);
    console.log('Current page is...', currentPage);
  };
  /**
   * memo for clearPages
   */
  // useMemo(() => clearPages(query), [query]);

  useEffect(() => {
    // console.log('Query & page equal ', query, currentPage);
    getFetchImages(query, currentPage);
  }, [query]);

  return [pictures, isLoading, totalCount, currentPage, clearPages, nextPages];
};
