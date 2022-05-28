import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ currentImg, onEsc, handleOverlayClick }) { 

    useEffect(() => {
      window.document.addEventListener('keydown', onEsc);
      return () => {
        window.document.removeEventListener('keydown', onEsc)
      }
    }, [onEsc])
    return createPortal(
        <div className="Overlay" onClick={ handleOverlayClick}>
            <div className="Modal">
                <img src={currentImg.largeImageURL} alt="largeImageURL" />
            </div>
        </div>, modalRoot
    )
}
Modal.propType = {
    currentImg: PropTypes.object,
    handleOverlayClick: PropTypes.func,
    onEsc: PropTypes.func
}