import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaCheckCircle, FaPlusCircle, FaPrint } from "react-icons/fa";
import { Receipt } from "./Receipt";
import { useTranslation } from "react-i18next";

export default function ReceiptSection({
  onGoingInvoice,
  handelNewOrder,
  reciptDate,
  invoiceID,
}) {
  const receiptRef = useRef();
  const { t } = useTranslation();
  const handelPrinting = useReactToPrint({
    contentRef: receiptRef,
  });
  return (
    <div className="receipt-section">
      <h2>
        {t("paymentSucceed")}
        <FaCheckCircle className="check-svg" />
      </h2>
      <div className="options">
        <button className="print-btn" onClick={handelPrinting}>
          <FaPrint /> {t("printReceipt")}
        </button>
        <button className="new-order-btn" onClick={() => handelNewOrder()}>
          <FaPlusCircle /> {t("newOrder")}
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
