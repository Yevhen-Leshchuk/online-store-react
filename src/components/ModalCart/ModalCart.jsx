import { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import sprite from '../../images/svg/sprite.svg';
import pullover from '../../images/img/pullover-md.jpg';
import glasses from '../../images/img/glasses-md.jpg';
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
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <h2 className={s.title}>
            My Bag<span className={s.titleValue}>, 3 items</span>
          </h2>
          <ul className={s.cartList}>
            <li className={s.cartListItem}>
              <div className={s.productDescription}>
                <h2 className={s.productTitle}>Apollo</h2>
                <h3 className={s.kindOfProduct}>Running Short</h3>

                <p className={s.price}>$50.00</p>

                <div className={s.sizeContainer}>
                  <h3 className={s.sizeTitle}>SIZE:</h3>
                  <ul className={s.sizeBox}>
                    <li className={s.sizeItem}>XS</li>
                    <li className={s.sizeItem}>S</li>
                    <li className={s.sizeItem}>M</li>
                    <li className={s.sizeItem}>L</li>
                  </ul>
                </div>

                <div className={s.colorContainer}>
                  <h3 className={s.colorTitle}>COLOR:</h3>
                  <ul className={s.colorBox}>
                    <li className={s.colorItemBox}>
                      <div className={s.colorItem}></div>
                    </li>
                    <li className={s.colorItemBox}>
                      <div className={s.colorItem}></div>
                    </li>
                    <li className={s.colorItemBox}>
                      <div className={s.colorItem}></div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={s.productManagement}>
                <div className={s.counterBox}>
                  <button className={s.incrementBtn} type="button">
                    <svg className={s.incrementIcon}>
                      <use xlinkHref={`${sprite}#plus`} />
                    </svg>
                  </button>

                  <p className={s.quantity}>1</p>

                  <button className={s.decrementBtn} type="button">
                    <svg className={s.decrementIcon}>
                      <use xlinkHref={`${sprite}#minus`} />
                    </svg>
                  </button>
                </div>

                <div className={s.productImg}>
                  <img
                    className={s.productImage}
                    src={pullover}
                    alt="pullover"
                  />
                </div>
              </div>
            </li>

            <li className={s.cartListItem}>
              <div className={s.productDescription}>
                <h2 className={s.productTitle}>Jupiter</h2>
                <h3 className={s.kindOfProduct}>Wayfarer</h3>

                <p className={s.price}>$75.00</p>

                <div className={s.sizeContainer}>
                  <h3 className={s.sizeTitle}>SIZE:</h3>
                  <ul className={s.sizeBox}>
                    <li className={s.sizeItem}>S</li>
                    <li className={s.sizeItem}>M</li>
                  </ul>
                </div>

                <div className={s.colorContainer}>
                  <h3 className={s.colorTitle}>COLOR:</h3>
                  <ul className={s.colorBox}>
                    <li className={s.colorItemBox}>
                      <div className={s.colorItem}></div>
                    </li>
                    <li className={s.colorItemBox}>
                      <div className={s.colorItem}></div>
                    </li>
                    <li className={s.colorItemBox}>
                      <div className={s.colorItem}></div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={s.productManagement}>
                <div className={s.counterBox}>
                  <button className={s.incrementBtn} type="button">
                    <svg className={s.incrementIcon}>
                      <use xlinkHref={`${sprite}#plus`} />
                    </svg>
                  </button>

                  <p className={s.quantity}>2</p>

                  <button className={s.decrementBtn} type="button">
                    <svg className={s.decrementIcon}>
                      <use xlinkHref={`${sprite}#minus`} />
                    </svg>
                  </button>
                </div>

                <div className={s.productImg}>
                  <img className={s.productImage} src={glasses} alt="glasses" />
                </div>
              </div>
            </li>
          </ul>

          <div className={s.totalPriceBox}>
            <h2 className={s.titlePrice}>Total</h2>
            <p className={s.totalValue}>$200.00</p>
          </div>

          <div className={s.cartBtnBox}>
            <button className={s.cartBtn} type="button">
              View bag
            </button>
            <button className={s.cartBtn} type="submit">
              CHECK OUT
            </button>
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
}

export default ModalCart;
