import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import ProductCartItem from 'components/ProductCartItem';
import { clearCart } from 'redux/cart';
import { successMessage } from 'common/notifications/notification';
import s from './Cart.module.scss';

class Cart extends Component {
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
    const { products, quantity, currentCurrency, clearCart } = this.props;

    return (
      <div className={s.cartContainer}>
        <div className={s.productDescription}>
          <h1 className={s.title}>Cart</h1>

          <TransitionGroup component="ul" className={s.cartList}>
            {products.map(product => (
              <CSSTransition key={product.itemId} timeout={250} classNames={s}>
                <ProductCartItem
                  product={product}
                  currentCurrency={currentCurrency}
                  id={product.itemId}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>

          <div className={s.orderContainer}>
            <div className={s.orderInfoBox}>
              <ul className={s.orderBox}>
                <li className={s.orderItem} key={nanoid()}>
                  Tax 21%:
                </li>
                <li className={s.orderItem} key={nanoid()}>
                  Quantity
                </li>
                <li className={s.total} key={nanoid()}>
                  Total
                </li>
              </ul>

              <ul className={s.orderValueBox}>
                <li className={s.orderValueItem} key={nanoid()}>
                  {currentCurrency} {this.countTax()}
                </li>
                <li className={s.orderValueItem} key={nanoid()}>
                  {quantity}
                </li>
                <li className={s.orderValueItem} key={nanoid()}>
                  {currentCurrency}{' '}
                  {(
                    this.countTotal(currentCurrency) +
                    parseFloat(this.countTax())
                  ).toFixed(2)}
                </li>
              </ul>
            </div>

            <button
              className={s.orderBtn}
              type="submit"
              onClick={() => {
                clearCart();
                successMessage('Thank you for your purchase!');
              }}
            >
              ORDER
            </button>
          </div>
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
  clearCart: () => dispatch(clearCart()),
});

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  quantity: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
