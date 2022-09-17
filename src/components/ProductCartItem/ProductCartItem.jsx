import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import Gallery from 'common/Gallery';
import { addItemToCart, removeItemFromCart } from 'redux/cart';
import sprite from '../../images/svg/sprite.svg';
import s from './ProductCartItem.module.scss';

class ProductCartItem extends PureComponent {
  setPriceCurrency = (prices, currency) => {
    let amount = 0;
    prices.forEach(price => {
      if (price.currency.symbol === currency) {
        amount = price.amount;
      }
    });
    return `${currency} ${amount}`;
  };

  render() {
    const { product, currentCurrency } = this.props;

    return (
      <li className={s.cartListItem} key={product.itemId}>
        <div className={s.productDescription}>
          <h2 className={s.productTitle}>{product.data.brand}</h2>
          <h3 className={s.kindOfProduct}>{product.data.name}</h3>

          <p className={s.price}>
            {this.setPriceCurrency(product.data.prices, currentCurrency)}
          </p>

          <form>
            {product.data.attributes.map(({ id, type, items }) => (
              <div className={s.attrContainer} key={nanoid()}>
                <h2 className={s.attrTitle}>{id} :</h2>
                <div className={s.attrBox}>
                  {items.map(({ value }) => {
                    return type === 'text' ? (
                      <div className={s.inputBoxText} key={nanoid()}>
                        <input className={s.inputText} type="radio" name={id} />

                        <label
                          className={
                            Object.values(product.attributes).find(
                              valueAttr => valueAttr === value
                            ) === value
                              ? s.selectedAttr
                              : s.text
                          }
                        >
                          {value}
                        </label>
                      </div>
                    ) : (
                      <div className={s.inputBoxSwatch} key={nanoid()}>
                        <input
                          type="radio"
                          className={s.inputSwatch}
                          name={id}
                        />
                        <label
                          className={
                            Object.values(product.attributes).find(
                              valueAttr => valueAttr === value
                            ) === value
                              ? s.inputSwatchChecked
                              : s.swatch
                          }
                          style={{
                            backgroundColor: value,
                          }}
                        ></label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </form>
        </div>

        <div className={s.productManagement}>
          <div className={s.counterBox}>
            <button
              className={s.incrementBtn}
              type="submit"
              onClick={() => this.props.addItemToCart(product)}
            >
              <svg className={s.incrementIcon}>
                <use xlinkHref={`${sprite}#plus`} />
              </svg>
            </button>

            <p className={s.quantity}>{product.quantity}</p>

            <button
              className={s.decrementBtn}
              type="submit"
              onClick={() => this.props.removeItemFromCart(product)}
            >
              <svg className={s.decrementIcon}>
                <use xlinkHref={`${sprite}#minus`} />
              </svg>
            </button>
          </div>
          <Gallery gallery={product.data.gallery} product={product} />
        </div>
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addItemToCart: data => dispatch(addItemToCart(data)),
  removeItemFromCart: data => dispatch(removeItemFromCart(data)),
});

export default connect(null, mapDispatchToProps)(ProductCartItem);
