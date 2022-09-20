import { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { addItemToCart, removeItemFromCart, clearCart } from 'redux/cart';
import { successMessage } from 'common/notifications/notification';
import plus from '../../images/plus.svg';
import minus from '../../images/minus.svg';
import s from './MiniCart.module.scss';

class MiniCart extends Component {
  setPriceCurrency = (prices, currency) => {
    let amount = 0;
    prices.forEach(price => {
      if (price.currency.symbol === currency) {
        amount = price.amount;
      }
    });
    return `${currency} ${amount}`;
  };

  countTotal = currency => {
    let total = 0;
    this.props.products.forEach(product => {
      product.data.prices.forEach(element => {
        if (element.currency.symbol === currency) {
          total = total + element.amount * product.quantity;
        }
      });
    });

    return parseFloat(total.toFixed(2));
  };

  countTax = () =>
    ((this.countTotal(this.props.currentCurrency) * 21) / 100).toFixed(2);

  render() {
    const { products, currentCurrency, quantity, clearCart } = this.props;
    console.log(products);

    return (
      <div className={s.modal}>
        <h2 className={s.title}>
          My Bag<span className={s.titleValue}>, {quantity} items</span>
        </h2>
        <ul className={s.cartList}>
          {products.map(product => {
            return (
              <li className={s.cartListItem} key={product.itemId}>
                <div className={s.productDescription}>
                  <h2 className={s.productTitle}>{product.data.brand}</h2>
                  <h3 className={s.kindOfProduct}>{product.data.name}</h3>

                  <p className={s.price}>
                    {this.setPriceCurrency(
                      product.data.prices,
                      currentCurrency
                    )}
                  </p>

                  <form>
                    {product.data.attributes.map(({ id, type, items }) => (
                      <div className={s.attrContainer} key={nanoid()}>
                        <h2 className={s.attrTitle}>{id} :</h2>
                        <div className={s.attrBox}>
                          {items.map(({ value }) => {
                            return type === 'text' ? (
                              <div className={s.inputBoxText} key={nanoid()}>
                                <input
                                  className={s.inputText}
                                  type="radio"
                                  name={id}
                                />

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

                <div className={s.productImgContainer}>
                  <div className={s.productImgBox}>
                    <img
                      className={s.productImage}
                      src={product.data.gallery[0]}
                      alt={product.data.name}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={s.totalPriceBox}>
          <h2 className={s.titlePrice}>Total</h2>
          <p className={s.totalValue}>
            {currentCurrency}
            {(
              this.countTotal(currentCurrency) + parseFloat(this.countTax())
            ).toFixed(2)}
          </p>
        </div>

        <div className={s.cartBtnBox}>
          <Link
            to="cart"
            alt="cart"
            className={s.linkToCart}
            onClick={() => this.props.onClose()}
          >
            View bag
          </Link>
          <button
            className={s.cartBtn}
            type="submit"
            onClick={() => {
              clearCart();
              successMessage('Thank you for your purchase!');
            }}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart.cartItems,
  quantity: state.cart.quantity,
  currentCurrency: state.currentCurrency.symbol,
});

const mapDispatchToProps = dispatch => ({
  addItemToCart: data => dispatch(addItemToCart(data)),
  removeItemFromCart: data => dispatch(removeItemFromCart(data)),
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
