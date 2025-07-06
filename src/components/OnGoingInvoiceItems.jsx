import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { getTotal } from "../utilities/getTotal";

export default function OnGoingInvoiceItems({
  invoice,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const currentInvoiceItems = (
    <table>
      <caption>Invoice Items</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Unit Price</td>
          <td>Quantity</td>
          <td>Total</td>
          <td>Remove</td>
        </tr>
      </thead>
      <tbody>
        {invoice.map((product) => {
          return (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.unitPrice}$</td>
              <td className="quantity">
                <FaPlusCircle
                  className="plus-circle"
                  onClick={() => onIncrease(product.id)}
                />
                {product.quantity}
                <FaMinusCircle
                  className="minus-circle"
                  onClick={() => onDecrease(product.id)}
                />
              </td>
              <td>{(product.unitPrice * product.quantity).toFixed(2)}$</td>
              <td className="trash-can">
                <FaTrashAlt onClick={() => onRemove(product.id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Total:</td>
          <td>{getTotal(invoice)}$</td>
        </tr>
      </tfoot>
    </table>
  );
  return <div className="invoice-items">{currentInvoiceItems}</div>;
}
