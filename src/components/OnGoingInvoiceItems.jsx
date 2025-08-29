import TabelRaw from "./TableRaw";
import { getTotal } from "../utilities/getTotal";
import { useTranslation } from "react-i18next";
import { priceFormatter } from "../utilities/priceFormatter";

export default function OnGoingInvoiceItems({
  invoice,
  onIncrease,
  onDecrease,
  onRemove,
  hanelChangePrice,
  handelRestPriceToDefult,
}) {
  const { t, i18n } = useTranslation();
  const currentInvoiceItems = (
    <table>
      <thead>
        <tr>
          <td>{t("name")}</td>
          <td>{t("unitName")}</td>
          <td>{t("unitPrice")}</td>
          <td>{t("quantity")}</td>
          <td>{t("total")}</td>
          <td>{t("remove")}</td>
        </tr>
      </thead>
      <tbody>
        {invoice.map((product) => {
          return (
            <TabelRaw
              key={product.id}
              product={product}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              onRemove={onRemove}
              onSave={hanelChangePrice}
              onRest={handelRestPriceToDefult}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>{t("totalInvoicePrice")}</td>
          <td colSpan={2}>
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
  return <div className="invoice-items">{currentInvoiceItems}</div>;
}
