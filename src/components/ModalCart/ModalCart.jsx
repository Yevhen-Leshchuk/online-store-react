import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import s from './ModalCart.module.scss';

const modalRoot = document.querySelector('#modal-root');

class ModalCart extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.document.body.style.overflowY = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.document.body.style.overflowY = 'visible';
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}></div>,
      modalRoot
    );
  }
}

export default ModalCart;
