import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import OnGoingInvoiceItems from "./OnGoingInvoiceItems";
import { useTranslation } from "react-i18next";

export default function OnGoingInvoice({
  onGoingInvoice,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItemFromInvoice,
  onPending,
  onShowPayment,
  onCancleOnGoinigInvoice,
  handleOpenCustmerScreen,
  hanelChangePrice,
  handelRestPriceToDefult
}) {
  const { t } = useTranslation();
  return (
    <div className="invoice-body">
      <OnGoingInvoiceItems
        invoice={onGoingInvoice}
        onIncrease={onIncreaseQuantity}
        onDecrease={onDecreaseQuantity}
        onRemove={onRemoveItemFromInvoice}
        hanelChangePrice={hanelChangePrice}
        handelRestPriceToDefult={handelRestPriceToDefult}
      />
      <div className="invoice-options">
        <button className="pend-btn" onClick={() => onPending()}>
          <FaClock /> {t("pendInvoice")}
        </button>
        <button
          className="complete-btn"
          onClick={() => {
            onShowPayment();
          }}
        >
          <FaCheckCircle /> {t("completeInvoice")}
        </button>
        <button
          onClick={() => onCancleOnGoinigInvoice()}
          className="cancel-btn"
        >
          <FaTimesCircle /> {t("cancleInvoice")}
        </button>
      </div>
      <button
        className="open-custmer-page-btn"
        onClick={handleOpenCustmerScreen}
      >
        {t("showCustmerPage")}
      </button>
    </div>
  );
}
