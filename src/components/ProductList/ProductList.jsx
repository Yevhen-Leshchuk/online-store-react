import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { addItemToCart } from 'redux/cart';
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

  addToCart = product => {
    const itemId = nanoid();
    let obj = {};
    product.attributes.forEach(attribute => {
      obj[attribute.id] = attribute.items[0].value;
    });

    const updateData = {
      attributes: obj,
      data: product,
      itemId,
    };

    this.props.addItemToCart(updateData);
  };

  render() {
    const { productsList, getProductItem, currentCurrency } = this.props;
    // console.log(productsList);

    return (
      <>
        <CategoryName />
        <ul className={s.productList}>
          {productsList &&
            productsList.map(product => {
              return (
                <li key={product.id} className={s.productCard}>
                  <Link
                    to="/product-card"
                    alt="product card"
                    className={!product.inStock ? s.inStockOverlay : null}
                    onClick={() => getProductItem(product.id)}
                  >
                    <div className={s.productImgBox}>
                      <img
                        className={s.productCardImage}
                        src={product.gallery[0]}
                        alt={product.name}
                      />
                      {!product.inStock && (
                        <p className={s.inStockText}>OUT OF STOCK</p>
                      )}
                    </div>
                    <p className={s.productCardTitle}>
                      {product.brand} {product.name}
                    </p>
                    {product.prices.map(
                      price => price.currency.label === currentCurrency
                    )}
                    <p className={s.productCardCost}>
                      {this.setPriceCurrency(product.prices, currentCurrency)}
                    </p>
                  </Link>
                  {product.inStock && (
                    <button
                      type="button"
                      className={s.btnAddToCart}
                      onClick={() => this.addToCart(product)}
                    >
                      <svg className={s.cartIcon}>
                        <use xlinkHref={`${sprite}#empty-cart`} />
                      </svg>
                    </button>
                  )}
                </li>
              );
            })}
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
  addItemToCart: data => dispatch(addItemToCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
