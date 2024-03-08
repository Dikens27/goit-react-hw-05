import css from './ImageModal.module.css';
import Modal from 'react-modal';

export default function ImageModal({ isOpen, onClose, content }) {
  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      {isOpen && (
        <>
          <img
            className={css.image}
            src={content.urls.regular}
            alt={content.description}
          />
          <p>Author: {content.user.last_name}</p>
        </>
      )}
    </Modal>
  );
}
