import { PureComponent } from 'react';
import pulloverS from '../../images/img/pullover-s.jpg';
import pulloverXl from '../../images/img/pullover-xl.jpg';
import s from './ProductCard.module.scss';

class ProductCard extends PureComponent {
  render() {
    return (
      <>
        <div className={s.productCardBox}>
          <ul className={s.smallImgBox}>
            <li className={s.imgBox}>
              <img className={s.productImage} src={pulloverS} alt="pullover" />
            </li>
            <li className={s.imgBox}>
              <img className={s.productImage} src={pulloverS} alt="pullover" />
            </li>
            <li className={s.imgBox}>
              <img className={s.productImage} src={pulloverS} alt="pullover" />
            </li>
          </ul>
          <div className={s.cardBox}>
            <div className={s.productImgBox}>
              <img className={s.productImage} src={pulloverXl} alt="pullover" />
            </div>

            <div className={s.productDescription}>
              <h2 className={s.productTitle}>Apollo</h2>
              <h3 className={s.kindOfProduct}>Running Short</h3>

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

              <div className={s.priceContainer}>
                <h3 className={s.priceTitle}>PRICE:</h3>
                <p className={s.price}>$50.00</p>
              </div>

              <button className={s.btnAddtoCart} type="button">
                ADD TO CART
              </button>

              <p className={s.description}>
                Find stunning women's cocktail dresses and party dresses. Stand
                out in lace and metallic cocktail dresses and party dresses from
                all your favorite brands.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductCard;
