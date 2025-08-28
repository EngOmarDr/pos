import { forwardRef } from "react";
import { getTotal } from "../utilities/getTotal";
import { useTranslation } from "react-i18next";
import { getLocalISODateTime } from "../utilities/getLocalISODateTime";
import { priceFormatter } from "../utilities/priceFormatter";
function ReceiptComponent({ invoiceData, reciptDate, invoiceID }, ref) {
  const { t, i18n } = useTranslation();
  return (
    <div ref={ref} className="receipt">
      <h2>{t("receipt")}</h2>
      <p>
        {t("invoiceIdentifer")} {invoiceID}
      </p>
      <p>
        {t("invoiceDate")} {getLocalISODateTime(reciptDate)}
      </p>
      <table>
        <thead>
          <tr>
            <th>{t("item")}</th>
            <th>{t("quantity")}</th>
            <th>{t("unitPrice")}</th>
            <th>{t("total")}</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                {priceFormatter(
                  item.price,
                  "",
                  i18n.language === "ar" ? "ar-SA" : "en-US"
                )}
              </td>
              <td>
                {priceFormatter(
                  item.price * item.quantity,
                  "",
                  i18n.language === "ar" ? "ar-SA" : "en-US"
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>{t("totalInvoicePrice")}</td>
            <td>
              {priceFormatter(
                getTotal(invoiceData),
                "SAR",
                i18n.language === "ar" ? "ar-SA" : "en-US"
              )}
            </td>
          </tr>
        </tfoot>
      </table>
      <p>{t("thankYouLetter")}</p>
    </div>
  );
}

export const Receipt = forwardRef(ReceiptComponent);
