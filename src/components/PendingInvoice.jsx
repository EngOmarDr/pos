import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getLocalISODateTime } from "../utilities/getLocalISODateTime.js";
export default function PendingInvoice({
  invoiceId,
  date,
  items,
  handelCancling,
  handelShowItems,
}) {
  const { t } = useTranslation();
  return (
    <div className="pending-invoice">
      <div className="info">
        <h2> {t("invoiceIdentifer")} </h2>
        <p>
          {t("invoiceDate")} {getLocalISODateTime(date)}
        </p>
      </div>
      <div className="options">
        <Link
          to="/"
          state={{ invoiceItems: items, isPending: true, invoiceId }}
          className="complete-btn"
        >
          <FaCheckCircle /> {t("completeInvoice")}
        </Link>
        <button
          className="cancel-btn"
          onClick={() => handelCancling(invoiceId)}
        >
          <FaTimesCircle /> {t("cancleInvoice")}
        </button>
        <button className="show-btn" onClick={() => handelShowItems(items)}>
          <FaEye /> {t('show')}
        </button>
      </div>
    </div>
  );
}
