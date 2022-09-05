import { PureComponent } from 'react';
import sprite from '../../images/svg/sprite.svg';
import s from './CurrencySwitcher.module.scss';

class CurrencySwitcher extends PureComponent {
  render() {
    return (
      <>
        <ul className={s.currencySwitcherBox}>
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
