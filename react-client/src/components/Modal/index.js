import React, { useEffect } from 'react';

const Modal = (props) => {

  const { toggle, isShowing, children } = props;

  useEffect(() => {

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        toggle()
      }
    };

    if (isShowing) {    
      window.addEventListener('keydown', handleEsc);
    }

    return () => window.removeEventListener('keydown', handleEsc);

    }, [isShowing, toggle]);

    if (!isShowing) {
      return null;
    }

    return (
      <div className="modal">
        <button onClick={toggle}>close</button>
        <div className="modal__wrapper">
          <div className="modal__content">
            {children}
          </div>
        </div>
      </div>
    )
}

export default Modal;