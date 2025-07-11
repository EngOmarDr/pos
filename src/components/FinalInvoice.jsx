import { getTotal } from "../utilities/getTotal";
import loginImg from "../assets/syrien trading logo - 1 .jpg";
export default function FinalInvoice({ invoice, isCustmerScreen }) {
  // I add isCompletOrSuspended boolen porop becase from the back-end the names are not the same
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
        {invoice.map((product) => {
          return (
            <tr key={product.id}>
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
  return (
    <div
      className={`final-invoice-section ${
        isCustmerScreen ? "custmer-screen" : ""
      }`}
    >
      {isCustmerScreen && <img src={loginImg} alt="LOGO" />}
      {isCustmerScreen && <h3>Thank You For Shoping With Us</h3>}
      {finalInvoiceItems}
    </div>
  );
}
