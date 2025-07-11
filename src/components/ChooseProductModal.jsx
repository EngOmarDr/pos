import { useRef, useEffect } from "react";
import AvailableProducts from "./AvailableProducts";
export default function ChooseProductModal({
  products,
  open,
  onClose,
  handleAddProductToInvoice,
  handelCloseModel,
}) {
  const dialog = useRef();
  console.log(products);

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
          <button className="close-btn" onClick={handelCloseModel}>
            CLOSE
          </button>
          <h2>Choose one of them please : </h2>
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
