import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Gallery from 'components/Gallery';
import { addItemToCart, removeItemFromCart } from 'redux/cart';
import setPriceCurrency from 'common/utils/setPrice';
import plus from '../../images/plus.svg';
import minus from '../../images/minus.svg';
import s from './ProductCartItem.module.scss';

class ProductCartItem extends Component {
  render() {
    const { product, currentCurrency } = this.props;

    return (
      <li className={s.cartListItem} key={product.itemId}>
        <div className={s.productDescription}>
          <h2 className={s.productTitle}>{product.data.brand}</h2>
          <h3 className={s.kindOfProduct}>{product.data.name}</h3>

          <p className={s.price}>
            {setPriceCurrency(product.data.prices, currentCurrency)}
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
              <img src={plus} alt="plus" className={s.incrementIcon} />
            </button>

            <p className={s.quantity}>{product.quantity}</p>

            <button
              className={s.decrementBtn}
              type="submit"
              onClick={() => this.props.removeItemFromCart(product)}
            >
              <img src={minus} alt="minus" className={s.decrementIcon} />
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

ProductCartItem.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      data: PropTypes.shape({
        brand: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        prices: PropTypes.arrayOf(PropTypes.shape({})),
        attributes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
              PropTypes.shape({
                value: PropTypes.string.isRequired,
              })
            ),
          })
        ),
      }),
      quantity: PropTypes.number.isRequired,
      gallery: PropTypes.string.isRequired,
    })
  ),
  addItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(ProductCartItem);
