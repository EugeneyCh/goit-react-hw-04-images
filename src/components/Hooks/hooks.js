import { useEffect, useState } from 'react';
import { createSearchOptions } from 'components/Utilities/utilities';
import axios from 'axios';

export const useGetFetchImages = (query, currPage) => {
  const [pictures, setPictures] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getFetchImages = async (query, currPage) => {
    if (!query) {
      //   setPictures([]);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.get(createSearchOptions(query, currPage));
      // const newPictures = data.hits;
      // setTotalCount(data.totalHits);
      // setPictures(prevPictures => [...prevPictures, ...newPictures]);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  // const clearPages = searchQuery => {
  //   if (searchQuery) {
  //     //   setCurrentPage(() => 1);
  //     setPictures([]);
  //   }
  // };

  /**
   * memo for clearPages
   */
  //   useMemo(() => clearPages(searchQuery), [searchQuery]);

  useEffect(() => {
    // if (!query || query.trim() === '') {
    //   // setPictures([]);
    //   return;
    // }
    console.log('Query & page equal ', query, currPage);
    // if (currPage === 1) {
    //   getFetchImages(query, 1);
    // } else {
    //   getFetchImages(query, currPage);
    // }
    getFetchImages(query, currPage);
  }, [currPage, query]);

  return [pictures, isLoading, totalCount];
};
