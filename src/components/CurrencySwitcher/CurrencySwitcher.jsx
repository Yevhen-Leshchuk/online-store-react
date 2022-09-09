import React, { PureComponent } from 'react';
import sprite from '../../images/svg/sprite.svg';
import s from './CurrencySwitcher.module.scss';

class CurrencySwitcher extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside, true);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside, true);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.onClose();
    }
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCurrencyClick = event => {
    if (event.currentTarget !== event.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <>
        <ul
          className={s.currencySwitcherBox}
          onClick={this.handleCurrencyClick}
          ref={this.ref}
        >
          <li className={s.currencySwitcherItem}>
            <svg className={s.currencyIcon}>
              <use xlinkHref={`${sprite}#usd`} />
            </svg>
          </li>
          <li className={s.currencySwitcherItem}>
            <svg className={s.currencyIcon}>
              <use xlinkHref={`${sprite}#eur`} />
            </svg>
          </li>
          <li className={s.currencySwitcherItem}>
            <svg className={s.currencyIcon}>
              <use xlinkHref={`${sprite}#jpy`} />
            </svg>
          </li>
        </ul>
      </>
    );
  }
}

export default CurrencySwitcher;
