import { useRef, useEffect } from "react";
import AvailableProducts from "./AvailableProducts";
import { useTranslation } from "react-i18next";
export default function ChooseProductModal({
  products,
  open,
  onClose,
  handleAddProductToInvoice,
  handelCloseModel,
}) {
  const dialog = useRef();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? (
        <div className="products-section">
          <button
            className={`close-btn ${i18n.language === "ar" && "ar"}`}
            onClick={handelCloseModel}
          >
            {t("close")}
          </button>
          <h2>{t("chooseOne")}</h2>
          <div className="products">
            <AvailableProducts
              products={products}
              onAddItem={handleAddProductToInvoice}
            />
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
