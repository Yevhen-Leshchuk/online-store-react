import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sprite from '../../images/svg/sprite.svg';
import CategoryName from 'components/CategoryName';
import { productsOperations } from 'redux/products';
import s from './ProductList.module.scss';

class ProductList extends PureComponent {
  componentDidUpdate() {
    this.props.getProductsList(this.props.currentCategory);
  }

  render() {
    const { productsList, getProductsItem } = this.props;
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
                      onClick={() => getProductsItem(id)}
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
                      <p className={s.productCardCost}>${prices[0].amount}</p>
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

  productId: state.categories.productName,
  productsList: state.products.products,
});

const mapDispatchToProps = dispatch => ({
  getProductsList: currentCategory =>
    dispatch(productsOperations.getProductList(currentCategory)),
  getProductsItem: id => dispatch(productsOperations.getProductItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
