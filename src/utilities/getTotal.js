export function getTotal(invoice) {
  return invoice
    .reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0)
    .toFixed(2);
}
