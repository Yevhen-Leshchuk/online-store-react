import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { Interweave } from 'interweave';
import { addItemToCart } from 'redux/cart';
import s from './ProductCard.module.scss';

class ProductCard extends PureComponent {
  state = {
    imageSRC: '',
  };

  formUpHandler = event => {
    event.preventDefault();
    const { productItem } = this.props;
    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedCartData = {};

    formData.forEach((value, key) => {
      submittedCartData[key] = value;
    });
    const itemId = nanoid();

    const updateData = {
      attributes: submittedCartData,
      data: productItem,
      itemId,
    };

    this.props.addItemToCart(updateData);
  };

  render() {
    const { productItem } = this.props;
    const { imageSRC } = this.state;

    const { name, gallery, brand, inStock, prices, description, attributes } =
      productItem;

    return (
      <>
        <div className={s.productCardBox}>
          <ul className={s.smallImgBox}>
            {gallery.map(image => {
              return (
                <li
                  className={s.imgBox}
                  onClick={() => this.setState({ imageSRC: image })}
                  key={nanoid()}
                >
                  <img className={s.productImage} src={image} alt={image} />
                </li>
              );
            })}
          </ul>
          <div className={s.cardBox}>
            <div className={s.productImgBox}>
              <img
                className={s.productImage}
                src={imageSRC === '' ? gallery[0] : imageSRC}
                alt="pullover"
              />
            </div>

            <div className={s.productDescription}>
              <h2 className={s.productTitle}>{brand}</h2>
              <h3 className={s.kindOfProduct}>{name}</h3>

              <form onSubmit={this.formUpHandler}>
                {attributes.map(({ id, type, items }) => (
                  <div className={s.attrContainer} key={nanoid()}>
                    <h2 className={s.attrTitle}>{id} :</h2>
                    <div className={s.attrBox}>
                      {items.map(({ value }) => {
                        return type === 'text' ? (
                          <div className={s.inputBoxText} key={nanoid()}>
                            <input
                              className={s.inputText}
                              type="radio"
                              id={value + id}
                              value={value}
                              name={id}
                              required
                            />

                            <label htmlFor={value + id} className={s.text}>
                              {value}
                            </label>
                          </div>
                        ) : (
                          <div className={s.inputBoxSwatch} key={nanoid()}>
                            <input
                              type="radio"
                              id={value + id}
                              className={s.inputSwatch}
                              value={value}
                              name={id}
                              required
                            />
                            <label
                              htmlFor={value + id}
                              className={s.swatch}
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

                <div className={s.priceContainer}>
                  <h3 className={s.priceTitle}>PRICE:</h3>
                  <p className={s.price}>${prices[0].amount}</p>
                </div>

                <button
                  className={
                    !inStock ? `${s.disabledBtn}` : `${s.btnAddtoCart}`
                  }
                  type="submit"
                  disabled={!inStock}
                >
                  ADD TO CART
                </button>
              </form>

              <Interweave content={description} className={s.description} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  productItem: state.products.productItem,
});

const mapDispatchToProps = dispatch => ({
  addItemToCart: data => dispatch(addItemToCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
