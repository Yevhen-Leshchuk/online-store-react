import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navigation from 'components/Navigation';
import CurrencySwitcher from 'components/CurrencySwitcher';
import sprite from '../../images/svg/sprite.svg';
import s from './Header.module.scss';

class Header extends PureComponent {
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
          <div className={s.currencySwitcherBtnBox}>
            <svg className={s.currencyIcon}>
              <use xlinkHref={`${sprite}#dollar`} />
            </svg>

            <svg className={s.arrowDownIcon}>
              <use xlinkHref={`${sprite}#arrow-down`} />
            </svg>

            <svg className={s.arrowUpIcon}>
              <use xlinkHref={`${sprite}#arrow-up`} />
            </svg>
          </div>

          <div className={s.cartBtnBox}>
            <svg className={s.cartIcon}>
              <use xlinkHref={`${sprite}#empty-cart`} />
            </svg>
          </div>
        </div>
        <CurrencySwitcher />
      </header>
    );
  }
}

export default Header;
