import { PureComponent } from 'react';
import sprite from '../../images/svg/sprite.svg';
import pullover from '../../images/img/pullover-cart.jpg';
import glasses from '../../images/img/glasses.jpg';
import s from './Cart.module.scss';

class Cart extends PureComponent {
  render() {
    return (
      <div className={s.cartContainer}>
        <div className={s.productDescription}>
          <h1 className={s.title}>Cart</h1>
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

                <div className={s.switcherImgBox}>
                  <button className={s.switcherImgLeft} type="button">
                    <svg className={s.switcherIcon}>
                      <use xlinkHref={`${sprite}#arrow-left`} />
                    </svg>
                  </button>
                  <button className={s.switcherImgRight} type="button">
                    <svg className={s.switcherIcon}>
                      <use xlinkHref={`${sprite}#arrow-right`} />
                    </svg>
                  </button>
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
                  <img
                    className={s.productImage}
                    src={glasses}
                    alt="pullover"
                  />

                  <div className={s.switcherImgBox}>
                    <button className={s.switcherImgLeft} type="button">
                      <svg className={s.switcherIcon}>
                        <use xlinkHref={`${sprite}#arrow-left`} />
                      </svg>
                    </button>
                    <button className={s.switcherImgRight} type="button">
                      <svg className={s.switcherIcon}>
                        <use xlinkHref={`${sprite}#arrow-right`} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className={s.orderContainer}>
            <div className={s.orderInfoBox}>
              <ul className={s.orderBox}>
                <li className={s.orderItem}>Tax 21%:</li>
                <li className={s.orderItem}>Quantity</li>
                <li className={s.orderItem}>Total</li>
              </ul>

              <ul className={s.orderValueBox}>
                <li className={s.orderValueItem}>$42.00</li>
                <li className={s.orderValueItem}>3</li>
                <li className={s.orderValueItem}>$200.00</li>
              </ul>
            </div>

            <button className={s.orderBtn} type="button">
              ORDER
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
