import { forwardRef } from "react";
import { getTotal } from "../utilities/getTotal";
import { useTranslation } from "react-i18next";
import { getLocalISODateTime } from "../utilities/getLocalISODateTime";
function ReceiptComponent({ invoiceData, reciptDate, invoiceID }, ref) {
  const { t } = useTranslation();
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
              <td>{item.price.toFixed(2)}$</td>
              <td>{(item.price * item.quantity).toFixed(2)} $</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>{t("totalInvoicePrice")}</td>
            <td>{getTotal(invoiceData)}$</td>
          </tr>
        </tfoot>
      </table>
      <p>{t("thankYouLetter")}</p>
    </div>
  );
}

export const Receipt = forwardRef(ReceiptComponent);
