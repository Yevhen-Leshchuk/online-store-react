import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
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
    currencyArr: null,
  };

  async componentDidMount() {
    await this.props.getCurrency();
  }

  async componentDidUpdate(_, prevState) {
    if (this.props.currency !== prevState.currencyArr) {
      await this.setState({ currencyArr: this.props.currency });
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      showCurrency: false,
    });
  };

  openCurrency = () => {
    this.setState({ showCurrency: true, showModal: false });
  };

  closeCurrency = () => {
    this.setState({ showCurrency: false });
  };

  render() {
    const { quantity, currentCurrency } = this.props;
    const { showCurrency, currencyArr, showModal } = this.state;

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
                  this.openCurrency();
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
                  this.closeCurrency();
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

        <CSSTransition
          in={showModal}
          unmountOnExit
          timeout={250}
          classNames={s}
        >
          <ModalCart onClick={this.onClick} onClose={this.toggleModal} />
        </CSSTransition>

        <CSSTransition
          in={showModal}
          unmountOnExit
          timeout={250}
          classNames={s}
        >
          <MiniCart onClose={this.toggleModal} />
        </CSSTransition>

        <CSSTransition
          in={showCurrency}
          unmountOnExit
          timeout={300}
          classNames={s}
        >
          <CurrencySwitcher
            onClose={this.closeCurrency}
            showCurrency={showCurrency}
            currency={currencyArr}
          />
        </CSSTransition>
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

Header.propTypes = {
  quantity: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  getCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
