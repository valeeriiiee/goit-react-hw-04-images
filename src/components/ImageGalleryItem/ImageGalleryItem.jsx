import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import ImageModal from 'components/Modal/Modal';

const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = () => {
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <li className={css.imageGalleryItem} onClick={handleOpenModal}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      <ImageModal
        modalClose={handleCloseModal}
        modalOpen={selectedImage !== null}
        image={selectedImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
