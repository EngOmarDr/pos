import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaTimes } from "react-icons/fa";
import CompletedInvoice from "../components/CompletedInvoice";
import useFetchData from "../hooks/useFetchData";
import { fetchAllInvoices } from "../services/InvoiceServices";
import FinalInvoice from "../components/FinalInvoice";
import { useTranslation } from "react-i18next";

export default function CompletedInvoicesPage() {
  const { t } = useTranslation();
  const [showInvoiceItems, setShowInvoiceItems] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const navigate = useNavigate();
  const {
    error: errorInFetchInvoices,
    isFetching: loadingInvoices,
    fetchData: allInvoices,
  } = useFetchData(fetchAllInvoices);

  const complatedInvoices = allInvoices
    .filter((invoice) => !invoice.isSuspended)
    .map((invoice) => {
      console.log(invoice.id);
      console.log(invoice.invoiceItems);
      return (
        <CompletedInvoice
          key={invoice.id}
          invoiceId={invoice.id}
          date={invoice.date}
          items={invoice.invoiceItems}
          handelShowItems={handelShowItems}
          handelReturnGoods={handelReturnGoods}
        />
      );
    });

  const MySwal = withReactContent(Swal);

  function handelShowItems(items) {
    setShowInvoiceItems((prev) => !prev);
    setInvoiceItems(items);
  }
  function handelClosePopup() {
    setShowInvoiceItems((prev) => !prev);
    setInvoiceItems([]);
  }
  async function handelReturnGoods() {
    const result = await MySwal.fire({
      title: "Return Goods From Invoice",
      text: "This action Will Return Goods From Completed Invoice",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E76F51",
      cancelButtonColor: "#264653",
      confirmButtonText: "Return Whole Invoice",
      cancelButtonText: "Return Some Goods",
    });
    if (result.isConfirmed) {
      MySwal.fire({
        title: "Invoice Has Been Return !",
        text: "All Goods Has been Return To The Shop Completly",
        icon: "success",
        confirmButtonColor: "#2A9D8F",
      });
    } else if (result.isDismissed) {
      navigate("/", { replace: true });
    }
  }
  return (
    <div className="complated-invoice-page">
      <div className="complated-invoice-section">
        {loadingInvoices ? (
          <div className="loading-spinner"></div>
        ) : errorInFetchInvoices ? (
          <h3>{errorInFetchInvoices.message}</h3>
        ) : (
          complatedInvoices
        )}
        <div className={`popup-overlay ${showInvoiceItems ? "show" : "hide"}`}>
          <button className="close-btn" onClick={() => handelClosePopup()}>
            <FaTimes />
          </button>
          <FinalInvoice invoice={invoiceItems} />
        </div>
      </div>
    </div>
  );
}
