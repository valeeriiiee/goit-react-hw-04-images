import { useState, useEffect } from 'react';
import { getAPI } from '../pixabay-ai';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (search !== '') {
      fetchImages(search, page);
    }
  }, [search, page]);

  const fetchImages = async (search, page) => {
    try {
      setIsLoading(true);
      const fetchedImages = await getAPI(search, page);
      const { hits, totalHits } = fetchedImages;

      if (hits.length === 0) {
        toast.error(
          'Sorry but there are no images found related to the search query.'
        );
        return;
      }

      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }

      if (page * 12 >= totalHits) {
        setIsEnd(true);
        toast('Sorry but you have reached the end of the search results.');
      }

      setImages(prevImages => [...prevImages, ...hits]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newSearch = e.target.search.value.trim().toLowerCase();

    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
      setIsEnd(false);
    }
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {images.length >= 1 && <ImageGallery photos={images} />}
      {images.length >= 2 && !isEnd && <Button onClick={handleClick} />}
      {isLoading && <Loader />}
      {isError && toast.error('Oops! Something went wrong! Reload this page')}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
