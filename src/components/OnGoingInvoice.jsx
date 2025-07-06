import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import OnGoingInvoiceItems from "./OnGoingInvoiceItems";

export default function OnGoingInvoice({
  onGoingInvoice,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItemFromInvoice,
  onPending,
  onShowPayment,
  onCancleOnGoinigInvoice,
}) {
  return (
    <div className="invoice-body">
      <OnGoingInvoiceItems
        invoice={onGoingInvoice}
        onIncrease={onIncreaseQuantity}
        onDecrease={onDecreaseQuantity}
        onRemove={onRemoveItemFromInvoice}
      />
      <div className="invoice-options">
        <button className="pend-btn" onClick={() => onPending()}>
          <FaClock /> Pend Invoice
        </button>
        <button
          className="complete-btn"
          onClick={() => {
            onShowPayment();
          }}
        >
          <FaCheckCircle /> Complete Invoice
        </button>
        <button
          onClick={() => onCancleOnGoinigInvoice()}
          className="cancel-btn"
        >
          <FaTimesCircle /> Cancle Invoice
        </button>
      </div>
    </div>
  );
}
