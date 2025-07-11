import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast, ToastContainer } from "react-toastify";
import PendingInvoice from "../components/PendingInvoice";
import useFetchData from "../hooks/useFetchData";
import { deleteInvoice, fetchAllInvoices } from "../services/InvoiceServices";
import { FaTimes } from "react-icons/fa";
import FinalInvoice from "../components/FinalInvoice";

export default function PendingInvoicesPage() {
  const [showInvoiceItems, setShowInvoiceItems] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const {
    error: errorInFetchInvoices,
    isFetching: loadingInvoices,
    fetchData: allInvoices,
  } = useFetchData(fetchAllInvoices);

  const pendingInvoices = allInvoices
    .filter((invoice) => invoice.isSuspended)
    .map((invoice) => {
      return (
        <PendingInvoice
          key={invoice.id}
          invoiceId={invoice.id}
          date={invoice.date}
          items={invoice.invoiceItems}
          handelShowItems={handelShowItems}
          handelCancling={handelCancelingInvoice}
        />
      );
    });

  const MySwal = withReactContent(Swal);
  async function handelCancelingInvoice(id) {
    const result = await MySwal.fire({
      title: "Cancel Invoice?",
      text: "This action cannot be undone. All items in this invoice will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E76F51",
      cancelButtonColor: "#264653",
      confirmButtonText: "Yes, Cancel It",
      cancelButtonText: "No, Keep It",
    });
    if (result.isConfirmed) {
      try {
        await deleteInvoice(id);
        MySwal.fire({
          title: "Invoice Canceled",
          text: "The invoice has been successfully removed.",
          icon: "success",
          confirmButtonColor: "#2A9D8F",
        });
      } catch (error) {
        toast.error(`${error.response.data.message || "Faild To Send Data"}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }
  function handelShowItems(items) {
    setShowInvoiceItems((prev) => !prev);
    setInvoiceItems(items);
  }
  function handelClosePopup() {
    setShowInvoiceItems((prev) => !prev);
    setInvoiceItems([]);
  }

  return (
    <div className="pending-invoice-page">
      <div className="pending-invoice-section">
        {loadingInvoices ? (
          <div className="loading-spinner"></div>
        ) : errorInFetchInvoices ? (
          <h3>{errorInFetchInvoices.message}</h3>
        ) : pendingInvoices.length == 0 ? (
          <h2>No Pend invoice yet</h2>
        ) : (
          pendingInvoices
        )}
        <div className={`popup-overlay ${showInvoiceItems ? "show" : "hide"}`}>
          <button className="close-btn" onClick={() => handelClosePopup()}>
            <FaTimes />
          </button>
          <FinalInvoice invoice={invoiceItems} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
