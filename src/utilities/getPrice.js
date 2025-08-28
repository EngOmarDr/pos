export function getPrice(product, invoiceType) {
  let productFromPrice = product.prices.find((e) => {
    return e.priceId == invoiceType?.defaultPriceId;
  });
  return productFromPrice ;
}
