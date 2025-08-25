import { FaCopy, FaEye, FaPrint, FaUndoAlt } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Receipt } from "./Receipt";
import { Link } from "react-router-dom";
export default function CompletedInvoice({
  invoiceId,
  date,
  items,
  handelShowItems,
  handelReturnGoods,
}) {
  const receiptRef = useRef();
  const handelPrinting = useReactToPrint({
    contentRef: receiptRef,
  });
  return (
    <div className="completed-invoice">
      <div className="info">
        <h2> Invoice Id: {invoiceId} </h2>
        <p> Invoice Date: {date}</p>
      </div>
      <div className="options">
        <button className="print-btn" onClick={handelPrinting}>
          <FaPrint /> Print
        </button>
        <Link to="/" state={{ invoiceItems: items }} className="copy-btn">
          <FaCopy /> Copy
        </Link>
        <button className="show-btn" onClick={() => handelShowItems(items)}>
          <FaEye /> Show
        </button>
        {/* <button className="return-btn" onClick={handelReturnGoods}>
          <FaUndoAlt /> Return
        </button> */}
      </div>
      <div style={{ display: "none" }}>
        <Receipt
          ref={receiptRef}
          invoiceData={items}
          reciptDate={date}
          invoiceID={invoiceId}
        />
      </div>
    </div>
  );
}
