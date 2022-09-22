import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCurrentCurrency } from 'redux/currency';
import s from './CurrencySwitcher.module.scss';

class CurrencySwitcher extends Component {
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
    const { currency, currentCurrency } = this.props;
    const currencyArr = Object.entries(currency);

    return (
      <>
        <ul
          className={s.currencySwitcherBox}
          onClick={this.handleCurrencyClick}
          ref={this.ref}
        >
          {currencyArr &&
            currencyArr.map(unit => {
              return (
                <li
                  className={s.currencySwitcherItem}
                  onClick={() => currentCurrency(unit[0])}
                  key={unit[0]}
                >
                  <p className={s.currencySwitcherSymbol}>{unit[0]}</p>
                  <p className={s.currencySwitcherText}>{unit[1]}</p>
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.currency.currency,
});

const mapDispatchToProps = dispatch => ({
  currentCurrency: symbol => dispatch(addCurrentCurrency(symbol)),
});

CurrencySwitcher.propTypes = {
  currentCurrency: PropTypes.func.isRequired,
  currency: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
