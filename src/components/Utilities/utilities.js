export const createSearchOptions = (query, currPage) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const My_API_key = '35792081-ad86e3eac8072124d950161bb';
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
