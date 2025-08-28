export function priceFormatter(amount, currency, locale) {
  const price = currency
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(amount)
    : new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
      }).format(amount);
  return price;
}
