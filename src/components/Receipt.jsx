import { forwardRef } from "react";
import { getTotal } from "../utilities/getTotal";
function ReceiptComponent({ invoiceData, reciptDate, invoiceID }, ref) {
  return (
    <div ref={ref} className="receipt">
      <h2>Receipt</h2>
      <p>Invoice ID: {invoiceID}</p>
      <p>Date: {reciptDate}</p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: {`${getTotal(invoiceData)} $`} </h3>
      <p>Thank you for shopping with us!</p>
    </div>
  );
}

export const Receipt = forwardRef(ReceiptComponent);
