import { pendingInvoices, specialCustmers } from "../utilities/dump.js";
import { useRef, useState } from "react";
import useFetchData from "../hooks/useFetchData.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCheckCircle,
  FaClock,
  FaMinusCircle,
  FaMoneyBillWave,
  FaPlusCircle,
  FaPrint,
  FaTags,
  FaTimes,
  FaTimesCircle,
  FaTrashAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { fetchProducts } from "../services/PoductsServices.js";
import { fetchGroupsTree } from "../services/CroupsServices.js";
import { EmptyInvoice } from "../components/EmptyInvoice.jsx";
import { Receipt } from "../components/Receipt.jsx";
import ProductsSection from "../components/ProductSection.jsx";
import BarcodeScanner from "../components/BarcodeScanner.jsx";

export default function HomePage() {
  const fixedTax = 20;
  const receiptRef = useRef();
  const searchRef = useRef();
  const [searchResult, setSearchResult] = useState(undefined);
  const [activeCatagoryID, setActiveCatagoryID] = useState(null);
  const [filterdProducts, setFilterdProducts] = useState([]);
  const [onGoingInvoice, setOnGoingInvoice] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showCashInput, setShowCashInput] = useState(false);
  const [showCustmerAccountInput, setShowCustmerAccountInput] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    remaining: 0,
    chang: 0,
  });
  const [paymentFormData, setPaymentFormData] = useState({
    cashAmount: 0,
    custmerAccount: "none",
    custmerDescount: 0,
  });
  const [showApplyBtn, setShowApplyBtn] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const {
    fetchData: availableProducts,
    error: errorInFetchingProducts,
    isFetching: isFetchingProducts,
  } = useFetchData(fetchProducts);

  const {
    fetchData: availableGroups,
    error: errorInFetchingGroups,
    isFetching: isFetchingGroups,
  } = useFetchData(fetchGroupsTree);
  const MySwal = withReactContent(Swal);

  function handelCheckCash() {
    paymentFormData.cashAmount < paymentInfo.remaining
      ? setPaymentInfo((prev) => ({
          ...prev,
          remaining: prev.remaining - paymentFormData.cashAmount,
        }))
      : setPaymentInfo((prev) => ({
          remaining: 0,
          chang: paymentFormData.cashAmount - prev.remaining + prev.chang,
        }));
  }
  function getTotal() {
    return (
      onGoingInvoice.reduce((acc, cur) => {
        return acc + cur.unitPrice * cur.quantity;
      }, 0) + fixedTax
    ).toFixed(2);
  }
  function handelClearFilter() {
    setActiveCatagoryID(null);
    setFilterdProducts([]);
  }
  function handelActiveFilter(groupId) {
    setFilterdProducts(() => {
      return availableProducts.filter((product) => {
        return product.groupId === groupId;
      });
    });
    setActiveCatagoryID(groupId);
    console.log(filterdProducts);
  }
  function handelSerchSubmit(event) {
    event.preventDefault();
    const { id } = event.target;
    const searchValue = searchRef.current.value.trim();
    if (id == "search") {
      if (searchValue) {
        if (activeCatagoryID) {
          setSearchResult(() => {
            return filterdProducts.length != 0
              ? filterdProducts.filter((product) => {
                  return product.name
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase());
                })
              : undefined;
          });
        } else {
          setSearchResult(() => {
            return availableProducts.length !== 0
              ? availableProducts.filter((product) => {
                  return product.name
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase());
                })
              : undefined;
          });
        }
      } else {
        setSearchResult(undefined);
      }
    } else if (id == "reset") {
      setSearchResult(undefined);
      searchRef.current.value = "";
    }
  }
  // Probably It will change when we start with the invoice section (adding a new invoice )
  function handleAddProductToInvoice(product) {
    setOnGoingInvoice((prev) => {
      let isExist = prev.some((pro) => pro.name == product.name);
      return isExist
        ? prev.map((pro) => {
            return pro.name == product.name
              ? { ...pro, quantity: pro.quantity + 1 }
              : pro;
          })
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              code: product.barcodes[0].barcode,
              unitPrice: product.prices[0].price,
              quantity: 1,
            },
          ];
    });
  }
  function handleAddProductToInvoiceByCode(product) {
    // will come back when we start on going invice if we need any update
    if (product) {
      setOnGoingInvoice((prev) => {
        let isExist = prev.some((pro) => pro.name == product.name);
        return isExist
          ? prev.map((pro) => {
              return pro.name == product.name
                ? { ...pro, quantity: pro.quantity + 1 }
                : pro;
            })
          : [
              ...prev,
              {
                id: product.id,
                name: product.name,
                unitPrice: product.prices[0].price,
                quantity: 1,
              },
            ];
      });
    }
  }
  function handleRemoveItemFromInvoice(id) {
    setOnGoingInvoice((prev) => prev.filter((product) => product.id !== id));
  }
  function handleIncreaseQuantity(id) {
    setOnGoingInvoice((prev) => {
      return prev.map((pro) => {
        return pro.id == id ? { ...pro, quantity: pro.quantity + 1 } : pro;
      });
    });
  }
  function handleDecreaseQuantity(id) {
    let isLastItem = onGoingInvoice.some(
      (pro) => pro.id == id && pro.quantity == 1
    );
    isLastItem
      ? handleRemoveItemFromInvoice(id)
      : setOnGoingInvoice((prev) => {
          return prev.map((pro) => {
            return pro.id == id && pro.quantity > 1
              ? { ...pro, quantity: pro.quantity - 1 }
              : pro;
          });
        });
  }
  async function handelCancleOnGoinigInvoice() {
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
      setOnGoingInvoice([]);
      MySwal.fire({
        title: "Invoice Canceled",
        text: "The invoice has been successfully removed.",
        icon: "success",
        confirmButtonColor: "#2A9D8F",
      });
    }
  }
  async function handelPendingOnGoinigInvoice() {
    const result = await MySwal.fire({
      title: "Pend Invoice?",
      text: "This action will pend This ongoing Invoice.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E76F51",
      cancelButtonColor: "#264653",
      confirmButtonText: "Yes, Pend It",
      cancelButtonText: "No, Keep It",
    });
    if (result.isConfirmed) {
      setOnGoingInvoice([]);
      MySwal.fire({
        title: "Invoice Pended",
        text: "The invoice has been successfully pended.",
        icon: "success",
        confirmButtonColor: "#2A9D8F",
      });
    }
  }
  function handelChange(event) {
    const { name, value } = event.target;
    setPaymentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handelShowPayment() {
    setShowPayment((prev) => !prev);
    setPaymentInfo(() => ({
      remaining: getTotal(),
      chang: 0,
    }));
    setPaymentFormData({
      cashAmount: 0,
      custmerAccount: "none",
      custmerDescount: 0,
    });
    setShowApplyBtn(true);
  }
  function handelShowCashToggel() {
    return setShowCashInput((prev) => !prev);
  }
  function setShowCustmerAccountToggel() {
    return setShowCustmerAccountInput((prev) => !prev);
  }
  function handelApplyDescount() {
    setPaymentInfo((prev) => ({
      ...prev,
      remaining:
        prev.remaining -
        (paymentFormData.custmerDescount / 100) * prev.remaining,
    }));
    setShowApplyBtn(false);
  }
  async function handelAddingToCustmerAcount() {
    let result;
    if (paymentFormData.custmerAccount == "none") {
      toast.warn("You Got To Chose One First ! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      paymentInfo.remaining == 0
        ? toast.warn("Nothing Left To Add ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        : // Fake Add debts to custmer Account
          (result = await MySwal.fire({
            title: "Add To Custmer Account?",
            text: `This action will add The ${paymentInfo.remaining}$ To ${paymentFormData.custmerAccount} Account `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E76F51",
            cancelButtonColor: "#264653",
            confirmButtonText: "Yes, Add It",
            cancelButtonText: "No, Do Not Add It",
          }));
      if (result.isConfirmed) {
        setPaymentInfo((prev) => ({
          ...prev,
          remaining: 0,
        }));
        MySwal.fire({
          title: "Amount Added successfully",
          text: `The amount Hase been successfully added To ${paymentFormData.custmerAccount}.`,
          icon: "success",
          confirmButtonColor: "#2A9D8F",
        });
      }
    }
  }
  async function handelConfirmPayment() {
    var result;
    paymentInfo.remaining !== 0
      ? toast.warn("Amount has not been paid yet ! ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      : (result = await MySwal.fire({
          title: "Confirm Payment?",
          text: "This action will Confirm Payment and Complet The Invoice",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#E76F51",
          cancelButtonColor: "#264653",
          confirmButtonText: "Yes, Confirm It",
          cancelButtonText: "No, don't Confirm It ",
        }));
    if (result.isConfirmed) {
      setShowReceipt((prev) => !prev);
      //   MySwal.fire({
      //     title:'Payment Completed',
      //     text:'The Payment has been successfully Completed.',
      //     icon:'success',
      //     confirmButtonColor:'#2A9D8F'
      // });
    }
  }
  function handelNewOrder() {
    setOnGoingInvoice([]);
    setShowPayment((prev) => !prev);
    setShowReceipt((prev) => !prev);
  }
  const handelPrinting = useReactToPrint({
    contentRef: receiptRef,
  });
  const currentInvoiceItems = (
    <table>
      <caption>Invoice Items</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Unit Price</td>
          <td>Quantity</td>
          <td>Total</td>
          <td>Remove</td>
        </tr>
      </thead>
      <tbody>
        {onGoingInvoice.map((product) => {
          return (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.unitPrice}$</td>
              <td className="quantity">
                <FaPlusCircle
                  className="plus-circle"
                  onClick={() => handleIncreaseQuantity(product.id)}
                />
                {product.quantity}
                <FaMinusCircle
                  className="minus-circle"
                  onClick={() => handleDecreaseQuantity(product.id)}
                />
              </td>
              <td>{(product.unitPrice * product.quantity).toFixed(2)}$</td>
              <td className="trash-can">
                <FaTrashAlt
                  onClick={() => handleRemoveItemFromInvoice(product.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Taxes:</td>
          <td>{fixedTax}$</td>
        </tr>
        <tr>
          <td colSpan={4}>Total:</td>
          <td>{getTotal()}$</td>
        </tr>
      </tfoot>
    </table>
  );

  const finalInvoiceItems = (
    <table>
      <caption>Invoice Items</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Unit Price</td>
          <td>Quantity</td>
          <td>Total</td>
        </tr>
      </thead>
      <tbody>
        {onGoingInvoice.map((product) => {
          return (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.unitPrice}$</td>
              <td className="quantity">{product.quantity}</td>
              <td>{(product.unitPrice * product.quantity).toFixed(2)}$</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Taxes:</td>
          <td>{fixedTax}$</td>
        </tr>
        <tr>
          <td colSpan={3}>Total:</td>
          <td>{getTotal()}$</td>
        </tr>
      </tfoot>
    </table>
  );

  const receiptSection = (
    <div className="receipt-section">
      <h2>
        Payment Has Completed successfully{" "}
        <FaCheckCircle className="check-svg" />{" "}
      </h2>
      <div className="options">
        <button className="print-btn" onClick={handelPrinting}>
          <FaPrint /> Print Receipt
        </button>
        <button className="new-order-btn" onClick={() => handelNewOrder()}>
          <FaPlusCircle /> New Order
        </button>
      </div>
      {/* Test With Invoice From dump.sj */}
      <div style={{ display: "none" }}>
        <Receipt ref={receiptRef} invoiceData={pendingInvoices[0]} />
      </div>
    </div>
  );
  return (
    <div className="home-container">
      <BarcodeScanner
        onQRScan={handleAddProductToInvoiceByCode}
        allProdcuts={availableProducts}
      />
      <div className={`popup-overlay ${showPayment ? "show" : "hide"}`}>
        <div className={`popup-payment-window ${!showPayment ? "hide" : ""}`}>
          <div className="final-invoice-section">{finalInvoiceItems}</div>
          {showReceipt ? (
            receiptSection
          ) : (
            <>
              <div className="payment-section">
                <div className="process-info">
                  <h2>Choise A Pyment Methode :</h2>
                  <p>You Can Chosie More Than one </p>
                </div>
                <div className="custmer-discount">
                  {showApplyBtn && (
                    <>
                      <label htmlFor="custmerDescount">
                        Apply Custmer Discount:
                      </label>
                      <select
                        id="custmerDescount"
                        name="custmerDescount"
                        onChange={handelChange}
                        value={paymentFormData.custmerDescount}
                      >
                        {specialCustmers.map((custmer) => {
                          return (
                            <option key={custmer.id} value={custmer.dicount}>
                              {custmer.name}
                            </option>
                          );
                        })}
                      </select>
                    </>
                  )}
                  {paymentFormData.custmerDescount > 0 && showApplyBtn && (
                    <div className="apply-descount">
                      <span>
                        {" "}
                        you have a descount of {paymentFormData.custmerDescount}
                        %
                      </span>
                      <button
                        onClick={() => {
                          handelApplyDescount();
                        }}
                        className="apply-descount-btn"
                      >
                        <FaTags className="btn-icon" /> Apply
                      </button>
                    </div>
                  )}
                </div>
                <div className="payment-methods">
                  <button
                    className="cash-btn"
                    onClick={() => handelShowCashToggel()}
                  >
                    <FaMoneyBillWave className="btn-icon" /> Cash
                  </button>
                  <button
                    className="custmer-account-btn"
                    onClick={() => setShowCustmerAccountToggel()}
                  >
                    <FaUserCircle className="btn-icon" /> Custmer Account
                  </button>
                </div>
                <div className="payments">
                  {showCashInput && (
                    <div className="cash-method">
                      <label htmlFor="cashAmount">Enter An Amount:</label>
                      <input
                        id="cashAmount"
                        name="cashAmount"
                        value={paymentFormData.cashAmount}
                        onChange={handelChange}
                        type="number"
                        min="0"
                      />
                      <button
                        onClick={() => handelCheckCash()}
                        className="check-cash-btn"
                      >
                        <FaCheckCircle className="btn-icon" /> check
                      </button>
                    </div>
                  )}
                  {showCustmerAccountInput && (
                    <div className="custmer-Account-method">
                      <label htmlFor="custmerAccount">Choise A Custmer:</label>
                      <select
                        id="custmerAccount"
                        name="custmerAccount"
                        onChange={handelChange}
                        value={paymentFormData.custmerAccount}
                      >
                        {specialCustmers.map((custmer) => {
                          return (
                            <option key={custmer.id} value={custmer.name}>
                              {custmer.name}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        className="add-to-custmer-acount-btn"
                        onClick={() => handelAddingToCustmerAcount()}
                      >
                        <FaPlusCircle /> Add Remaning To Custmer Acount
                      </button>
                      <ToastContainer />
                    </div>
                  )}
                  <div className="process-calculation">
                    <h2 className="pyment-remaining">
                      Remaining:{paymentInfo.remaining}{" "}
                    </h2>
                    <h2 className="pyment-change">chang:{paymentInfo.chang}</h2>
                    <button
                      className="confirm-btn"
                      onClick={() => handelConfirmPayment()}
                    >
                      <FaCheckCircle /> Confirm Payment
                      <ToastContainer />
                    </button>
                  </div>
                </div>
              </div>
              <button className="close-btn" onClick={() => handelShowPayment()}>
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="invoice-section">
        {onGoingInvoice.length !== 0 ? (
          <div className="invoice-body">
            <div className="invoice-items">{currentInvoiceItems}</div>
            <div className="invoice-options">
              <button
                className="pend-btn"
                onClick={() => handelPendingOnGoinigInvoice()}
              >
                <FaClock /> Pend Invoice
              </button>
              <button
                className="complete-btn"
                onClick={() => {
                  handelShowPayment();
                }}
              >
                <FaCheckCircle /> Complete Invoice
              </button>
              <button
                onClick={() => handelCancleOnGoinigInvoice()}
                className="cancel-btn"
              >
                <FaTimesCircle /> Cancle Invoice
              </button>
            </div>
          </div>
        ) : (
          <EmptyInvoice />
        )}
      </div>

      {isFetchingProducts || isFetchingGroups ? (
        <div className="loading-spinner"></div>
      ) : errorInFetchingProducts || errorInFetchingGroups ? (
        <h3>
          {errorInFetchingGroups
            ? errorInFetchingGroups.message
            : errorInFetchingProducts.message}
        </h3>
      ) : (
        // There is A lot of props driling, Probably it will change
        <ProductsSection
          searchResult={searchResult}
          activeCatagoryID={activeCatagoryID}
          availableGroups={availableGroups}
          availableProducts={availableProducts}
          filterdProducts={filterdProducts}
          handelActiveFilter={handelActiveFilter}
          handelClearFilter={handelClearFilter}
          handelSerchSubmit={handelSerchSubmit}
          handleAddProductToInvoice={handleAddProductToInvoice}
          searchRef={searchRef}
        />
      )}
    </div>
  );
}
