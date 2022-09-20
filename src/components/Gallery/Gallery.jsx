import React, { Component } from 'react';
import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';
import s from './Gallery.module.scss';

class Gallery extends Component {
  state = {
    currentIndex: 0,
  };

  util = (n, m) => {
    return ((n % m) + m) % m;
  };

  onClickArrowLeft = gallery => {
    const newIndex = this.util(this.state.currentIndex - 1, gallery.length);
    this.setState({ currentIndex: newIndex });
  };

  onClickArrowRight = gallery => {
    const newIndex = this.util(this.state.currentIndex + 1, gallery.length);
    this.setState({ currentIndex: newIndex });
  };

  render() {
    let gallery = this.props.gallery;
    const { product } = this.props;
    // console.log(this.state.currentIndex);

    return (
      <>
        <div className={s.productImg}>
          <img
            className={s.productImage}
            src={gallery[this.state.currentIndex]}
            alt={product.data.name}
          />
        </div>
        {product.data.gallery.length > 1 && (
          <div className={s.switcherImgBox}>
            <button
              className={s.switcherImgLeft}
              type="button"
              onClick={() => this.onClickArrowLeft(gallery)}
            >
              <img
                src={arrowLeft}
                alt="arrow-left"
                className={s.switcherIcon}
              />
            </button>
            <button
              className={s.switcherImgRight}
              type="button"
              onClick={() => this.onClickArrowRight(gallery)}
            >
              <img
                src={arrowRight}
                alt="arrow-right"
                className={s.switcherIcon}
              />
            </button>
          </div>
        )}
      </>
    );
  }
}

export default Gallery;
