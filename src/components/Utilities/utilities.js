export const createSearchOptions = (query, currPage) => {

  /**
   * заменить My_API_key на MY_API_KEY
   *
   * вынeсти константы BASE_URL, My_API_KEY в файл .env / .env.local
   * https://stackoverflow.com/questions/49108136/importing-env-variable-react-front-end
   *
   * .env убрать из Git.
   */


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

  /**
   * Преобразовать в литерал
   */
  return BASE_URL + `?` + options.toString();
};
