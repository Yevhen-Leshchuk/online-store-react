import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import pullover from '../../images/img/pullover-m.jpg';
import sweater from '../../images/img/sweater.jpg';
import robeOutOfStock from '../../images/img/robe-out-of-stock.jpg';
import robe from '../../images/img/robe.jpg';
import bag from '../../images/img/bag.jpg';
import sprite from '../../images/svg/sprite.svg';
import CategoryName from 'components/CategoryName';
import s from './ProductList.module.scss';

class ProductList extends PureComponent {
  render() {
    return (
      <>
        <CategoryName />
        <ul className={s.productList}>
          <li key={null} className={s.productCard}>
            <Link to="/product-card" alt="product card">
              <div className={s.productImgBox}>
                <img
                  className={s.productCardImage}
                  src={pullover}
                  alt="pullover"
                />
              </div>
              <p className={s.productCardTitle}>Apollo Running Short</p>
              <p className={s.productCardCost}>$50.00</p>
            </Link>
            <button type="button" className={s.btnAddToCart}>
              <svg className={s.cartIcon}>
                <use xlinkHref={`${sprite}#empty-cart`} />
              </svg>
            </button>
          </li>

          <li key={null} className={s.productCard}>
            <Link to="/product-card" alt="product card">
              <div className={s.productImgBox}>
                <img
                  className={s.productCardImage}
                  src={sweater}
                  alt="sweater"
                />
              </div>
              <p className={s.productCardTitle}>Apollo Running Short</p>
              <p className={s.productCardCost}>$50.00</p>
            </Link>
            <button type="button" className={s.btnAddToCart}>
              <svg className={s.cartIcon}>
                <use xlinkHref={`${sprite}#empty-cart`} />
              </svg>
            </button>
          </li>

          <li key={null} className={s.productCard}>
            <Link to="/product-card" alt="product card">
              <div className={s.productImgBox}>
                <img
                  className={s.productCardImage}
                  src={robeOutOfStock}
                  alt="robe"
                />
              </div>
              <p className={s.productCardTitle}>Apollo Running Short</p>
              <p className={s.productCardCost}>$50.00</p>
            </Link>
            <button type="button" className={s.btnAddToCart}>
              <svg className={s.cartIcon}>
                <use xlinkHref={`${sprite}#empty-cart`} />
              </svg>
            </button>
          </li>

          <li key={null} className={s.productCard}>
            <Link to="/product-card" alt="product card">
              <div className={s.productImgBox}>
                <img className={s.productCardImage} src={bag} alt="bag" />
              </div>
              <p className={s.productCardTitle}>Apollo Running Short</p>
              <p className={s.productCardCost}>$50.00</p>
            </Link>
            <button type="button" className={s.btnAddToCart}>
              <svg className={s.cartIcon}>
                <use xlinkHref={`${sprite}#empty-cart`} />
              </svg>
            </button>
          </li>

          <li key={null} className={s.productCard}>
            <Link to="/product-card" alt="product card">
              <div className={s.productImgBox}>
                <img
                  className={s.productCardImage}
                  src={pullover}
                  alt="pullover"
                />
              </div>
              <p className={s.productCardTitle}>Apollo Running Short</p>
              <p className={s.productCardCost}>$50.00</p>
            </Link>
            <button type="button" className={s.btnAddToCart}>
              <svg className={s.cartIcon}>
                <use xlinkHref={`${sprite}#empty-cart`} />
              </svg>
            </button>
          </li>

          <li key={null} className={s.productCard}>
            <Link to="/product-card" alt="product card">
              <div className={s.productImgBox}>
                <img className={s.productCardImage} src={robe} alt="robe" />
              </div>
              <p className={s.productCardTitle}>Apollo Running Short</p>
              <p className={s.productCardCost}>$50.00</p>
            </Link>
            <button type="button" className={s.btnAddToCart}>
              <svg className={s.cartIcon}>
                <use xlinkHref={`${sprite}#empty-cart`} />
              </svg>
            </button>
          </li>
        </ul>
      </>
    );
  }
}

export default ProductList;
