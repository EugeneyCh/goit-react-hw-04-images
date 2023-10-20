export const createSearchOptions = (query, currPage) => {
  console.log('Query & page are - ', query, currPage);
  const BASE_URL = 'https://pixabay.com/api/';
  const My_API_key = process.env.REACT_APP_ACCESS_KEY;
  const options = new URLSearchParams({
    key: My_API_key,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currPage,
    per_page: 12,
  });
  return BASE_URL + `?` + options.toString();
};
