import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Nav from 'components/Navigation';
import CurrencySwitcher from 'components/CurrencySwitcher';
import ModalCart from 'components/ModalCart';
import MiniCart from 'components/MiniCart';
import { currencyOperations } from 'redux/currency';
import arrowDown from '../../images/arrow-down.svg';
import VSF from '../../images/VSF.svg';
import arrowUp from '../../images/arrow-up.svg';
import emptyCart from '../../images/empty-cart.svg';
import s from './Header.module.scss';

class Header extends Component {
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

    return (
      <header className={s.header}>
        <Nav />

        <Link to="/" alt="CategoryPage" className={s.logoBox}>
          <img src={VSF} alt="VSF" className={s.logoBox} />
        </Link>

        <div className={s.toolsBox}>
          <div className={s.currencySwitcherBox}>
            <h2 className={s.currencySwitcherSymbol}>{currentCurrency}</h2>
            {!showCurrency && (
              <button
                type="button"
                className={s.currencySwitcherBtn}
                onClick={() => {
                  this.props.getCurrency();
                  this.toggleCurrency();
                }}
              >
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className={s.arrowDownIcon}
                />
              </button>
            )}
            {showCurrency && (
              <button
                type="button"
                className={s.currencySwitcherBtn}
                onClick={() => {
                  this.toggleCurrency();
                }}
              >
                <img src={arrowUp} alt="arrow-up" className={s.arrowUpIcon} />
              </button>
            )}
          </div>

          <button
            type="button"
            className={s.cartBtnBox}
            onClick={this.toggleModal}
          >
            <img src={emptyCart} alt="empty-cart" className={s.cartIcon} />
          </button>
        </div>
        {quantity > 0 && (
          <div className={s.quantityProductBox}>
            <span className={s.quantityProductText}>{quantity}</span>
          </div>
        )}

        {this.state.showCurrency && (
          <CurrencySwitcher onClose={this.toggleCurrency} />
        )}

        {this.state.showModal && (
          <ModalCart onClick={this.onClick} onClose={this.toggleModal} />
        )}
        {this.state.showModal && <MiniCart onClose={this.toggleModal} />}
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
