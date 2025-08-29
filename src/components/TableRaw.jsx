import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaMinusCircle,
  FaPlusCircle,
  FaTrashAlt,
  FaEdit,
  FaUndoAlt,
  FaSave,
} from "react-icons/fa";
import { priceFormatter } from "../utilities/priceFormatter";

export default function TabelRaw({
  product,
  onIncrease,
  onRemove,
  onDecrease,
  onSave,
  onRest,
}) {
  const { i18n } = useTranslation();
  const [removing, setRemoving] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(0);

  function handelisEditing(event) {
    const value = event.target.value;
    setIsEditing(true);
    setEditedPrice(value);
  }
  function handelSaveChanges() {
    setIsEditing(false);
    onSave(product, +editedPrice);
  }
  return (
    <tr
      key={product.id + product.unitItemId}
      className={`text-center fade-in-row ${
        removing === product.id ? "fade-out-row" : ""
      }`}
    >
      <td className="text-center">{product.name}</td>
      <td className="text-center">{product.unitItemName}</td>
      <td className="text-center">
        <div className="unitPrice">
          {isEditing ? (
            <input
              className="price-chanag-input"
              type="number"
              min={0}
              value={editedPrice}
              onChange={handelisEditing}
              defaultValue={product.price}
            />
          ) : (
            priceFormatter(
              product.price,
              "",
              i18n.language === "ar" ? "ar-SA" : "en-US"
            )
          )}
          {!isEditing ? (
            <FaEdit className="edit-btn" onClick={handelisEditing} />
          ) : (
            <FaSave className="save-btn" onClick={handelSaveChanges} />
          )}
          <FaUndoAlt className="undo-btn" onClick={() => onRest(product)} />
        </div>
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
  );
}
