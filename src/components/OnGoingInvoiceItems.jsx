import { useState } from "react";
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { getTotal } from "../utilities/getTotal";
import { useTranslation } from "react-i18next";
import { priceFormatter } from "../utilities/priceFormatter";
export default function OnGoingInvoiceItems({
  invoice,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const { t, i18n } = useTranslation();
  const [removing, setRemoving] = useState(null);
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
        {invoice.map((product) => (
          <tr
            key={product.id + product.unitItemId}
            className={`text-center fade-in-row ${
              removing === product.id ? "fade-out-row" : ""
            }`}
          >
            <td className="text-center">{product.name}</td>
            <td className="text-center">{product.unitItemName}</td>
            <td className="text-center">
              {priceFormatter(
                product.price,
                "",
                i18n.language === "ar" ? "ar-SA" : "en-US"
              )}
            </td>
            <td className="text-center">
              <div className="quantity">
                <FaPlusCircle
                  className="plus-circle"
                  onClick={() => onIncrease(product.id)}
                />
                <span className="quantity-number">{product.quantity}</span>
                <FaMinusCircle
                  className="minus-circle"
                  onClick={() => {
                    if (product.quantity == 1) {
                      setRemoving(product.id);
                      setTimeout(() => {
                        onRemove(product.id);
                        setRemoving(null);
                      }, 300);
                    } else {
                      onDecrease(product.id);
                    }
                  }}
                />
              </div>
            </td>
            <td className="text-center">
              {priceFormatter(
                product.price * product.quantity,
                "",
                i18n.language === "ar" ? "ar-SA" : "en-US"
              )}
            </td>
            <td className="trash-can">
              <div className="flex justify-center">
                <FaTrashAlt
                  onClick={() => {
                    setRemoving(product.id);
                    setTimeout(() => {
                      onRemove(product.id);
                      setRemoving(null);
                    }, 300);
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>{t("totalInvoicePrice")}</td>
          <td colSpan={2} >
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
