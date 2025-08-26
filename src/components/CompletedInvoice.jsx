import { FaCopy, FaEye, FaPrint, FaUndoAlt } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Receipt } from "./Receipt";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalISODateTime } from "../utilities/getLocalISODateTime";
export default function CompletedInvoice({
  invoiceId,
  date,
  items,
  handelShowItems,
  handelReturnGoods,
}) {
  const { t } = useTranslation();
  const receiptRef = useRef();
  const handelPrinting = useReactToPrint({
    contentRef: receiptRef,
  });
  return (
    <div className="completed-invoice">
      <div className="info">
        <h2>
          {t("invoiceIdentifer")} {invoiceId}
        </h2>
        <p>
          {t("invoiceDate")} {getLocalISODateTime(date)}
        </p>
      </div>
      <div className="options">
        <button className="print-btn" onClick={handelPrinting}>
          <FaPrint /> {t("print")}
        </button>
        <Link to="/" state={{ invoiceItems: items }} className="copy-btn">
          <FaCopy /> {t("copy")}
        </Link>
        <button className="show-btn" onClick={() => handelShowItems(items)}>
          <FaEye /> {t("show")}
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
