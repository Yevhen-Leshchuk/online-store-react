import React, { PureComponent } from 'react';
import sprite from '../../images/svg/sprite.svg';
import s from './Gallery.module.scss';

class Gallery extends PureComponent {
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
              <svg className={s.switcherIcon}>
                <use xlinkHref={`${sprite}#arrow-left`} />
              </svg>
            </button>
            <button
              className={s.switcherImgRight}
              type="button"
              onClick={() => this.onClickArrowRight(gallery)}
            >
              <svg className={s.switcherIcon}>
                <use xlinkHref={`${sprite}#arrow-right`} />
              </svg>
            </button>
          </div>
        )}
      </>
    );
  }
}

export default Gallery;
