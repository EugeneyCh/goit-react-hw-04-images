import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
// import PropTypes from 'prop-types';
import { useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';

function App() {
  const [state, setState] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);

  const handleFormSubmit = searchQuery => {
    setState(searchQuery);
    // setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {state &&
        <>
          <ImageGallery searchQuery={state} />
          <ToastContainer position="top-center" autoClose={2000} />
        </>
      }

    </div>
  );
}

// App.propTypes = {
//   searchQuery: PropTypes.string,
// };

export default App;
