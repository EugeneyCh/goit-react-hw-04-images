import { useEffect, useState } from 'react';
import { createSearchOptions } from 'components/Utilities/utilities';
import axios from 'axios';

export const useGetFetchImages = (query, currPage) => {
  console.log('Search query is...', query);
  const [pictures, setPictures] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getFetchImages = async (query, currPage) => {
    if (query) {
      setPictures([]);
      return;
    }

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
  useEffect(() => {
    // if (currPage > 1) {
    getFetchImages(query, currPage);
    // }
  }, [currPage, query]);

  return [pictures, isLoading, totalCount];
};
