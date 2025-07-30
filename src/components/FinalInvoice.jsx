import { getTotal } from "../utilities/getTotal";
export default function FinalInvoice({ invoice }) {
  const finalInvoiceItems = (
    <table>
      <caption>Invoice Items</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Unit Price</td>
          <td>Quantity</td>
          <td>Total</td>
        </tr>
      </thead>
      <tbody>
        {invoice.map((product,index) => {
          return (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}$</td>
              <td className="quantity">{product.quantity}</td>
              <td>{(product.price * product.quantity).toFixed(2)}$</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Total:</td>
          <td>{getTotal(invoice)}$</td>
        </tr>
      </tfoot>
    </table>
  );
  return <div className="final-invoice-section">{finalInvoiceItems}</div>;
}
