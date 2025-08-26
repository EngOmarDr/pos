import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { getTotal } from "../utilities/getTotal";
import { useTranslation } from "react-i18next";

export default function OnGoingInvoiceItems({
  invoice,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const { t } = useTranslation();
  const currentInvoiceItems = (
    <table>
      {/* <caption>Invoice Items</caption> */}
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
            <tr key={product.id + product.unitItemId} className="text-center">
              <td className="text-center">{product.name}</td>
              <td className="text-center">{product.unitItemName}</td>
              <td className="text-center">{product.price}</td>
              <td className="text-center">
                <div className="quantity">
                  <FaPlusCircle
                    className="plus-circle"
                    onClick={() => onIncrease(product.id)}
                  />
                  {product.quantity}
                  <FaMinusCircle
                    className="minus-circle"
                    onClick={() => onDecrease(product.id)}
                  />
                </div>
              </td>
              <td className="text-center">
                {(product.price * product.quantity).toFixed(2)}
              </td>
              <td className="trash-can">
                <div className="flex justify-center">
                  <FaTrashAlt onClick={() => onRemove(product.id)} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>{t("totalInvoicePrice")}</td>
          <td>{getTotal(invoice)}</td>
        </tr>
      </tfoot>
    </table>
  );
  return <div className="invoice-items">{currentInvoiceItems}</div>;
}
