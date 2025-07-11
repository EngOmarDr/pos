import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PendingInvoice({
  invoiceId,
  date,
  items,
  handelCancling,
  handelShowItems,
}) {
  return (
    <div className="pending-invoice">
      <div className="info">
        <h2> Invoice Id: {invoiceId} </h2>
        <p> Invoice Date: {date}</p>
      </div>
      <div className="options">
        <Link
          to="/"
          state={{ invoiceItems: items, isPending: true, invoiceId }}
          className="complete-btn"
        >
          <FaCheckCircle /> Complete
        </Link>
        <button
          className="cancel-btn"
          onClick={() => handelCancling(invoiceId)}
        >
          <FaTimesCircle /> Cancle
        </button>
        <button className="show-btn" onClick={() => handelShowItems(items)}>
          <FaEye /> Show
        </button>
      </div>
    </div>
  );
}
