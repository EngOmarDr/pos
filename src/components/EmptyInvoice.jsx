import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa";

export function EmptyInvoice() {
  const { t } = useTranslation();
  return (
    <div className="empty-invoice">
      <FaShoppingCart className="empty-icon" />
      <p className="main-text">{t("noInvoice")}</p>
      <p className="sub-text">{t("startNewInvoice")}</p>
    </div>
  );
}
