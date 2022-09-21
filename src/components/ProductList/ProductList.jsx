import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { addItemToCart } from 'redux/cart';
import CategoryName from 'components/CategoryName';
import { productsOperations } from 'redux/products';
import emptyCart from '../../images/empty-cart-white.svg';
import s from './ProductList.module.scss';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevIndex: 6,
    };
    this.productRef = React.createRef();
  }
  componentDidMount() {
    this.props.getProductsList(this.props.currentCategory);
  }

  componentDidUpdate(_, prevState) {
    this.props.getProductsList(this.props.currentCategory);

    if (this.props.productsList.length > prevState.prevIndex) {
      this.lazyLoad(this.productRef.current);
    }
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

  lazyLoad = targets => {
    const options = {
      rootMargin: '100px',
    };

    const onEntry = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.props.getProductsList(this.props.currentCategory);
          this.setState({
            prevIndex: this.state.prevIndex + 6,
          });
          observer.unobserve(this.productRef.current);
        }
      });
    };

    const io = new IntersectionObserver(onEntry, options);

    io.observe(targets);
  };

  render() {
    const { productsList, getProductItem, currentCurrency, currentCategory } =
      this.props;
    // console.log(currentCategory);
    return (
      <>
        <CategoryName />
        <ul className={s.productList}>
          {productsList &&
            productsList.slice(0, this.state.prevIndex).map(product => {
              return (
                <li
                  key={product.id}
                  className={s.productCard}
                  ref={this.productRef}
                >
                  <Link
                    to={`/${currentCategory}/${product.id}`}
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
                      <img
                        src={emptyCart}
                        alt="empty-cart"
                        className={s.cartIcon}
                      />
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
