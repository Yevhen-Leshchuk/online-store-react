import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Navigation from 'components/Navigation';
import CurrencySwitcher from 'components/CurrencySwitcher';
import ModalCart from 'components/ModalCart';
import MiniCart from 'components/MiniCart';
import { currencyOperations } from 'redux/currency';
import sprite from '../../images/svg/sprite.svg';
import s from './Header.module.scss';

class Header extends PureComponent {
  state = {
    showModal: false,
    showCurrency: false,
  };

  async componentDidMount() {
    await this.props.getCurrency();
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      showCurrency: false,
    });
  };

  toggleCurrency = () => {
    this.setState({ showCurrency: !this.state.showCurrency, showModal: false });
  };

  render() {
    const { quantity, currentCurrency } = this.props;
    const { showCurrency } = this.state;
    // console.log(currency);
    // let currencyArr;
    // if (currency) {
    //   currencyArr = Object.entries(currency);
    // }

    return (
      <header className={s.header}>
        <Navigation />

        <Link to="/" alt="CategoryPage" className={s.logoBox}>
          <svg className={s.logo}>
            <use xlinkHref={`${sprite}#VSF`} />
          </svg>
        </Link>

        <div className={s.toolsBox}>
          <div className={s.currencySwitcherBox}>
            <h2 className={s.currencySwitcherSymbol}>{currentCurrency}</h2>
            {!showCurrency && (
              <button
                type="submit"
                className={s.currencySwitcherBtn}
                onClick={() => {
                  this.props.getCurrency();
                  this.toggleCurrency();
                }}
              >
                <svg className={s.arrowDownIcon}>
                  <use xlinkHref={`${sprite}#arrow-down`} />
                </svg>
              </button>
            )}
            {showCurrency && (
              <button
                type="submit"
                className={s.currencySwitcherBtn}
                onClick={() => {
                  this.toggleCurrency();
                }}
              >
                <svg className={s.arrowUpIcon}>
                  <use xlinkHref={`${sprite}#arrow-up`} />
                </svg>
              </button>
            )}
          </div>

          <button
            type="button"
            className={s.cartBtnBox}
            onClick={this.toggleModal}
          >
            <svg className={s.cartIcon}>
              <use xlinkHref={`${sprite}#empty-cart`} />
            </svg>
          </button>
        </div>
        {quantity > 0 && (
          <div className={s.quantityProductBox}>
            <span className={s.quantityProductText}>{quantity}</span>
          </div>
        )}

        {this.state.showCurrency && (
          <CurrencySwitcher
            onClose={this.toggleCurrency}
            // currency={currencyArr}
          />
        )}

        {this.state.showModal && (
          <ModalCart onClick={this.onClick} onClose={this.toggleModal} />
        )}
        {this.state.showModal && <MiniCart onClose={this.toggle} />}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  quantity: state.cart.quantity,
  currency: state.currency.currency,
  currentCurrency: state.currentCurrency.symbol,
});

const mapDispatchToProps = dispatch => ({
  getCurrency: () => dispatch(currencyOperations.getCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
