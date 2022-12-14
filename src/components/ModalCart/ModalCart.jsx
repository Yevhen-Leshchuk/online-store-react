import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './ModalCart.module.scss';

const modalRoot = document.querySelector('#modal-root');

class ModalCart extends Component {
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

ModalCart.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalCart;
