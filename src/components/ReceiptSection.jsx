import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaCheckCircle, FaPlusCircle, FaPrint } from "react-icons/fa";
import { Receipt } from "./Receipt";

export default function ReceiptSection({
  onGoingInvoice,
  handelNewOrder,
  reciptDate,
  invoiceID,
}) {
  const receiptRef = useRef();
  const handelPrinting = useReactToPrint({
    contentRef: receiptRef,
  });
  return (
    <div className="receipt-section">
      <h2>
        Payment Has Completed successfully
        <FaCheckCircle className="check-svg" />
      </h2>
      <div className="options">
        <button className="print-btn" onClick={handelPrinting}>
          <FaPrint /> Print Receipt
        </button>
        <button className="new-order-btn" onClick={() => handelNewOrder()}>
          <FaPlusCircle /> New Order
        </button>
      </div>
      <div style={{ display: "none" }}>
        <Receipt
          ref={receiptRef}
          invoiceData={onGoingInvoice}
          reciptDate={reciptDate}
          invoiceID={invoiceID}
        />
      </div>
    </div>
  );
}
