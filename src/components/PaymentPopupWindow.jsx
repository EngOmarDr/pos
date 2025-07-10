import { FaTimes } from "react-icons/fa";
import ReceiptSection from "./ReceiptSection";
import FinalInvoice from "./FinalInvoice";
import PaymentSection from "./PaymentSection";
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
  return (
    <div className={`popup-payment-window ${!showPayment ? "hide" : ""}`}>
      <FinalInvoice invoice={onGoingInvoice} />
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
          <button className="close-btn" onClick={() => handelShowPayment()}>
            <FaTimes />
          </button>
        </>
      )}
    </div>
  );
}
