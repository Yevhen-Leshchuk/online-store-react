import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import ProductCartItem from 'components/ProductCartItem';
import s from './Cart.module.scss';

class Cart extends PureComponent {
  render() {
    const { products, quantity, currentCurrency } = this.props;
    // console.log(products);

    return (
      <div className={s.cartContainer}>
        <div className={s.productDescription}>
          <h1 className={s.title}>Cart</h1>
          <ul className={s.cartList}>
            {products.map(product => {
              return (
                <ProductCartItem
                  product={product}
                  currentCurrency={currentCurrency}
                  key={nanoid()}
                />
              );
            })}
          </ul>

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
                  $42.00
                </li>
                <li className={s.orderValueItem} key={nanoid()}>
                  {quantity}
                </li>
                <li className={s.orderValueItem} key={nanoid()}>
                  $200.00
                </li>
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

const mapStateToProps = state => ({
  products: state.cart.cartItems,
  quantity: state.cart.quantity,
  currentCurrency: state.currentCurrency.symbol,
});

export default connect(mapStateToProps)(Cart);
