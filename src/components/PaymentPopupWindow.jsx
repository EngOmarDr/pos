import { FaTimes } from "react-icons/fa";
import ReceiptSection from "./ReceiptSection";
import FinalInvoice from "./FinalInvoice";
import PaymentSection from "./PaymentSection";
import { useTranslation } from "react-i18next";
export default function PaymentPopupWindow({
  showPayment,
  onGoingInvoice,
  showReceipt,
  startNewOrder,
  handelShowPayment,
  handelChange,
  handelCheckCash,
  handelConfirmPayment,
  handelShowCashToggel,
  paymentFormData,
  paymentInfo,
  showCashInput,
  reciptDate,
  invoiceID,
}) {
  const { i18n } = useTranslation();
  return (
    <div className={`popup-payment-window ${!showPayment ? "hide" : ""}`}>
      <FinalInvoice key={showPayment} invoice={onGoingInvoice}/>
      {showReceipt ? (
        <ReceiptSection
          handelNewOrder={startNewOrder}
          onGoingInvoice={onGoingInvoice}
          invoiceID={invoiceID}
          reciptDate={reciptDate}
        />
      ) : (
        <>
          <PaymentSection
            handelChange={handelChange}
            handelCheckCash={handelCheckCash}
            handelConfirmPayment={handelConfirmPayment}
            handelShowCashToggel={handelShowCashToggel}
            paymentFormData={paymentFormData}
            paymentInfo={paymentInfo}
            showCashInput={showCashInput}
          />
          <button
            className={`close-btn ${i18n.language === "ar" && "ar"}`}
            onClick={() => handelShowPayment()}
          >
            <FaTimes />
          </button>
        </>
      )}
    </div>
  );
}
