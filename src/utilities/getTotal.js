export function getTotal(invoice) {
  return invoice
    .reduce((acc, cur) => {
      return acc + cur.unitPrice * cur.quantity;
    }, 0)
    .toFixed(2);
}
