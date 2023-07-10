import React, { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [searchWord, setSearchWord] = useState('');

  const handleChange = e => {
    setSearchWord(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchWord.trim() === '') {
      toast('Enter search value');
      reset();
      return;
    }
    onSubmit(searchWord);
    reset();
  };

  const reset = () => {
    setSearchWord('');
  };

  return (
    <header className={css.searchbar} onSubmit={handleSubmit}>
      <form className={css.searchForm}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          value={searchWord}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
