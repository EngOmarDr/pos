import { useTranslation } from "react-i18next";
import { getTotal } from "../utilities/getTotal";
export default function FinalInvoice({ invoice }) {
  const { t } = useTranslation();
  const finalInvoiceItems = (
    <table>
      <caption>{t("invoiceItems")}</caption>
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
              <td>{product.price}$</td>
              <td className="quantity">{product.quantity}</td>
              <td>{(product.price * product.quantity).toFixed(2)}$</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>{t("totalInvoicePrice")}</td>
          <td>{getTotal(invoice)}$</td>
        </tr>
      </tfoot>
    </table>
  );
  return <div className="final-invoice-section">{finalInvoiceItems}</div>;
}
