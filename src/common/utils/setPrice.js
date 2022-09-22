const setPriceCurrency = (prices, currency) => {
  let amount = 0;
  prices.forEach(price => {
    if (price.currency.symbol === currency) {
      amount = price.amount;
    }
  });
  return `${currency} ${amount}`;
};

export default setPriceCurrency;
