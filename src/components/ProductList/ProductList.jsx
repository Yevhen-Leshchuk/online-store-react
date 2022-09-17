import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sprite from '../../images/svg/sprite.svg';
import CategoryName from 'components/CategoryName';
import { productsOperations } from 'redux/products';
import s from './ProductList.module.scss';

class ProductList extends PureComponent {
  componentDidMount() {
    this.props.getProductsList(this.props.currentCategory);
  }

  componentDidUpdate() {
    this.props.getProductsList(this.props.currentCategory);
  }

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
    const { productsList, getProductItem, currentCurrency } = this.props;
    // console.log(productsList);

    return (
      <>
        <CategoryName />
        <ul className={s.productList}>
          {productsList &&
            productsList.map(
              ({ name, gallery, brand, inStock, prices, id }) => {
                return (
                  <li key={id} className={s.productCard}>
                    <Link
                      to="/product-card"
                      alt="product card"
                      className={!inStock ? s.inStockOverlay : null}
                      onClick={() => getProductItem(id)}
                    >
                      <div className={s.productImgBox}>
                        <img
                          className={s.productCardImage}
                          src={gallery[0]}
                          alt={name}
                        />
                        {!inStock && (
                          <p className={s.inStockText}>OUT OF STOCK</p>
                        )}
                      </div>
                      <p className={s.productCardTitle}>
                        {brand} {name}
                      </p>
                      {prices.map(
                        price => price.currency.label === currentCurrency
                      )}
                      <p className={s.productCardCost}>
                        {this.setPriceCurrency(prices, currentCurrency)}
                      </p>
                    </Link>
                    {inStock && (
                      <button type="button" className={s.btnAddToCart}>
                        <svg className={s.cartIcon}>
                          <use xlinkHref={`${sprite}#empty-cart`} />
                        </svg>
                      </button>
                    )}
                  </li>
                );
              }
            )}
        </ul>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentCategory: state.currentCategory.category,
  productsList: state.products.products,
  currentCurrency: state.currentCurrency.symbol,
});

const mapDispatchToProps = dispatch => ({
  getProductsList: currentCategory =>
    dispatch(productsOperations.getProductList(currentCategory)),
  getProductItem: id => dispatch(productsOperations.getProductItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
