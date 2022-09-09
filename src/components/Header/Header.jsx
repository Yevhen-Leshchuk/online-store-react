import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Navigation from 'components/Navigation';
import CurrencySwitcher from 'components/CurrencySwitcher';
import ModalCart from 'components/ModalCart';
import MiniCart from 'components/MiniCart';
import sprite from '../../images/svg/sprite.svg';
import s from './Header.module.scss';

class Header extends PureComponent {
  state = {
    showModal: false,
    showCurrency: false,
  };

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
    return (
      <header className={s.header}>
        <Navigation />

        <Link to="/" alt="CategoryPage" className={s.logoBox}>
          <svg className={s.logo}>
            <use xlinkHref={`${sprite}#VSF`} />
          </svg>
        </Link>

        <div className={s.toolsBox}>
          <button
            type="button"
            className={s.currencySwitcherBtnBox}
            onClick={this.toggleCurrency}
          >
            <svg className={s.currencyIcon}>
              <use xlinkHref={`${sprite}#dollar`} />
            </svg>

            <svg className={s.arrowDownIcon}>
              <use xlinkHref={`${sprite}#arrow-down`} />
            </svg>

            <svg className={s.arrowUpIcon}>
              <use xlinkHref={`${sprite}#arrow-up`} />
            </svg>
          </button>

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

        <div className={s.quantityProductBox}>
          <span className={s.quantityProductText}>3</span>
        </div>

        {this.state.showCurrency && (
          <CurrencySwitcher onClose={this.toggleCurrency} />
        )}

        {this.state.showModal && (
          <ModalCart onClick={this.onClick} onClose={this.toggleModal} />
        )}
        {this.state.showModal && <MiniCart onClose={this.toggle} />}
      </header>
    );
  }
}

export default Header;
