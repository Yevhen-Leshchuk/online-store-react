import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Interweave } from 'interweave';
import s from './ProductCard.module.scss';

class ProductCard extends PureComponent {
  state = {
    imageSRC: '',
  };

  formUpHandler = event => {
    event.preventDefault();
    const { productsItem } = this.props;
    const { id } = productsItem;
    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedSignUpData = {};

    formData.forEach((value, key) => {
      submittedSignUpData[key] = value;
    });

    const updateData = {
      ...submittedSignUpData,
      id,
    };
    console.log(updateData);
  };

  render() {
    const { productsItem } = this.props;
    const { imageSRC } = this.state;

    const {
      name,
      gallery,
      brand,
      inStock,
      prices,
      id,
      description,
      attributes,
    } = productsItem;

    return (
      <>
        <div className={s.productCardBox}>
          <ul className={s.smallImgBox}>
            {gallery.map(image => {
              return (
                <li
                  className={s.imgBox}
                  onClick={() => this.setState({ imageSRC: image })}
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
                  <div className={s.attrContainer}>
                    <h2 className={s.attrTitle}>{id} :</h2>
                    <div className={s.attrBox}>
                      {items.map(({ value }) => {
                        return type === 'text' ? (
                          <div className={s.inputBoxText}>
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
                          <div className={s.inputBoxSwatch}>
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
  productsItem: state.products.productItem,
});

export default connect(mapStateToProps)(ProductCard);
