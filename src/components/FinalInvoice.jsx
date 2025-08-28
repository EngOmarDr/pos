import { useTranslation } from "react-i18next";
import { getTotal } from "../utilities/getTotal";
import { priceFormatter } from "../utilities/priceFormatter";

export default function FinalInvoice({ invoice }) {
  const { t, i18n } = useTranslation();
  const finalInvoiceItems = (
    <table>
      {/* <caption>{t("invoiceItems")}</caption> */}
      <thead>
        <tr>
          <td>{t("name")}</td>
          <td>{t("unitPrice")}</td>
          <td>{t("quantity")}</td>
          <td>{t("total")}</td>
        </tr>
      </thead>

      <tbody>
        {invoice.map((product, index) => {
          return (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                {priceFormatter(
                  product.price,
                  "",
                  i18n.language === "ar" ? "ar-SA" : "en-US"
                )}
              </td>
              <td className="quantity">{product.quantity}</td>
              <td>
                {priceFormatter(
                  product.price * product.quantity,
                  "",
                  i18n.language === "ar" ? "ar-SA" : "en-US"
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>{t("totalInvoicePrice")}</td>
          <td>
            {priceFormatter(
              getTotal(invoice),
              "SAR",
              i18n.language === "ar" ? "ar-SA" : "en-US"
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
  return <div className="final-invoice-section">{finalInvoiceItems}</div>;
}
