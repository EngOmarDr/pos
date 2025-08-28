import { useEffect, useRef, useState } from "react";
import useFetchData from "../hooks/useFetchData.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts } from "../services/PoductsServices.js";
import { fetchGroupsTree } from "../services/CroupsServices.js";
import { getTotal } from "../utilities/getTotal.js";
import { EmptyInvoice } from "../components/EmptyInvoice.jsx";
import ProductsSection from "../components/ProductSection.jsx";
import BarcodeScanner from "../components/BarcodeScanner.jsx";
import OnGoingInvoice from "../components/OnGoingInvoice.jsx";
import useGetInvoiceRelatedData from "../hooks/useGetInvoiceRelatedData.js";
import PaymentPopupWindow from "../components/PaymentPopupWindow.jsx";
import Overlay from "../components/Overlay.jsx";
import {
  creatInvoice,
  fetchInvoiceTypeData,
  updateInvoice,
} from "../services/InvoiceServices.js";
import { useLocation } from "react-router-dom";
import ChooseProductModal from "../components/ChooseProductModal.jsx";
import { t } from "i18next";
import { getPrice } from "../utilities/getPrice.js";

export default function HomePage() {
  const searchRef = useRef();
  const customerWindowRef = useRef(null);
  const channelRef = useRef();
  const productWithTheSameBarcode = useRef(null);
  const loaction = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(undefined);
  const [activeCatagoryID, setActiveCatagoryID] = useState(null);
  const [filterdProducts, setFilterdProducts] = useState([]);
  const [invoiceType, setInvoiceType] = useState();
  const [lastClikedProduct, setLastClikedProduct] = useState(null);

  let initaliInvoice;
  if (loaction.state) {
    initaliInvoice = loaction.state.invoiceItems.map((item) => ({
      id: item.productId,
      name: item.name,
      // code: product.barcodes[0].barcode,
      price: item.price,
      quantity: item.quantity,
    }));
  }
  const [onGoingInvoice, setOnGoingInvoice] = useState(
    loaction.state ? initaliInvoice : []
  );
  const [finalInvoice, setFinalInvoice] = useState({
    reciptDate: null,
    invoiceID: null,
  });
  const [showPayment, setShowPayment] = useState(false);
  const [showCashInput, setShowCashInput] = useState(false);
  // const [showCustmerAccountInput, setShowCustmerAccountInput] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    remaining: 0,
    chang: 0,
  });
  const [paymentFormData, setPaymentFormData] = useState({
    cashAmount: 0,
    // custmerAccount: "none",
    // custmerDescount: 0,
  });
  // const [showApplyBtn, setShowApplyBtn] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const {
    fetchData: availableProducts,
    error: errorInFetchingProducts,
    isFetching: isFetchingProducts,
  } = useFetchData(fetchProducts);

  const {
    error: errorInInvoiceRelatedData,
    invoiceRelatedData,
    isFetching: isFetchingInvoiceRelatedData,
  } = useGetInvoiceRelatedData();
  const {
    fetchData: availableGroups,
    error: errorInFetchingGroups,
    isFetching: isFetchingGroups,
  } = useFetchData(fetchGroupsTree);
  const MySwal = withReactContent(Swal);

  if (!channelRef.current) {
    channelRef.current = new BroadcastChannel("pos-channel");
  }
  useEffect(() => {
    channelRef.current.postMessage({
      invoice: onGoingInvoice,
    });
    if (onGoingInvoice.length === 0) {
      if (customerWindowRef.current && !customerWindowRef.current.closed) {
        customerWindowRef.current.close();
      }
    }
  }, [onGoingInvoice]);

  useEffect(() => {
    fetchInvoiceTypeData().then((e) => {
      setInvoiceType(e);
    });
  }, []);

  async function handleOpenCustmerScreen() {
    let timeOut;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      channelRef.current.postMessage({
        invoice: onGoingInvoice,
      });
    }, 600);
    if (!customerWindowRef.current || customerWindowRef.current.closed) {
      customerWindowRef.current = window.open("/custmer-screen", "_blank");
    }
  }
  function handelCheckCash() {
    +paymentFormData.cashAmount < +paymentInfo.remaining
      ? setPaymentInfo((prev) => ({
          ...prev,
          remaining: +prev.remaining - +paymentFormData.cashAmount,
        }))
      : setPaymentInfo((prev) => ({
          remaining: 0,
          chang: +paymentFormData.cashAmount - +prev.remaining + +prev.chang,
        }));
  }

  function handelClearFilter() {
    setActiveCatagoryID(null);
    setFilterdProducts([]);
  }
  function handelActiveFilter(groupId) {
    console.log(groupId);

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
    setLastClikedProduct(product.id);
    setTimeout(() => setLastClikedProduct(null), 700);

    let productFromPrice = getPrice(product, invoiceType);
    setOnGoingInvoice((prev) => {
      let isExist = prev.some((pro) => pro.id == product.id);
      return isExist
        ? prev.map((pro) => {
            return pro.id == product.id
              ? { ...pro, quantity: pro.quantity + 1 }
              : pro;
          })
        : [
            ...prev,
            {
              id: product.id,
              quantity: 1,
              price: productFromPrice?.price ?? 0,
              unitItemId:
                productFromPrice?.unitItemId ??
                product.prices.at(0)?.unitItemId ??
                null,
              unitItemName:
                productFromPrice?.unitItemName ??
                product.prices.at(0)?.unitItemName ??
                undefined,
              name: product.name,
              code:
                product.barcodes.find((e) => {
                  return e.unitItemId == productFromPrice?.unitItemId;
                })?.barcode ?? null,
            },
          ];
    });
  }
  function handelCloseModel() {
    setModalIsOpen(false);
  }
  function handleAddProductToInvoiceByCode(product, barcodeScan) {
    setLastClikedProduct(product.id);
    setTimeout(() => setLastClikedProduct(null), 600);
    if (product) {
      if (product.length > 1) {
        productWithTheSameBarcode.current = product;
        setModalIsOpen(true);
      } else {
        console.log(barcodeScan);

        console.log(
          product.at(0).barcodes.find((e) => {
            console.log(e);

            return e.barcode == barcodeScan;
          })
        );

        let { unitItemId, unitItemName, barcode } = product
          .at(0)
          .barcodes.find((e) => {
            return e.barcode == barcodeScan;
          });
        setOnGoingInvoice((prev) => {
          let isExist = prev.some(
            (pro) => pro.id == product[0].id && pro.unitItemId == unitItemId
          );
          return isExist
            ? prev.map((pro) => {
                return pro.id == product[0].id && pro.unitItemId == unitItemId
                  ? { ...pro, quantity: pro.quantity + 1 }
                  : pro;
              })
            : [
                ...prev,
                {
                  id: product[0].id,
                  name: product[0].name,
                  price:
                    product[0].prices.find((e) => {
                      return (
                        e.priceId == invoiceType.defaultPriceId &&
                        e.unitItemId == unitItemId
                      );
                    })?.price ?? 0,
                  unitItemId: unitItemId ?? null,
                  unitItemName: unitItemName,
                  quantity: 1,
                },
              ];
        });
      }
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
      title: t("cancleInvoice") + "؟",
      text: t("actionCannotUndone"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E76F51",
      cancelButtonColor: "#264653",
      confirmButtonText: t("yesCancel"),
      cancelButtonText: t("noKeep"),
    });
    if (result.isConfirmed) {
      setOnGoingInvoice([]);
      MySwal.fire({
        title: t("invoiceCanceled"),
        text: t("successfullyRemoved"),
        icon: "success",
        confirmButtonColor: "#2A9D8F",
      });
    }
  }
  async function handelPendingOnGoinigInvoice() {
    const result = await MySwal.fire({
      title: t("pendInvoice") + "؟",
      text: t("willPend"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E76F51",
      cancelButtonColor: "#264653",
      confirmButtonText: t("yesPend"),
      cancelButtonText: t("noKeep"),
    });
    if (result.isConfirmed) {
      try {
        const invoice = {
          ...invoiceRelatedData,
          isSuspended: true,
          invoiceItems: onGoingInvoice.map((item) => {
            return {
              productId: item.id,
              unitItemId: item.unitItemId,
              qty: item.quantity,
              price: item.price,
            };
          }),
        };
        const responce = loaction.state?.isPending
          ? await updateInvoice(loaction.state.invoiceId, invoice)
          : await creatInvoice(invoice);
        console.log(responce);
        setOnGoingInvoice([]);
        MySwal.fire({
          title: t("invoicePended"),
          text: t("pendSuccessfully"),
          icon: "success",
          confirmButtonColor: "#2A9D8F",
        });
      } catch (error) {
        toast.error(`${error.response.data.message || t("faildToSend")}`, {
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
      remaining: getTotal(onGoingInvoice),
      chang: 0,
    }));
    setPaymentFormData({
      cashAmount: 0,
      // custmerAccount: "none",
      // custmerDescount: 0,
    });
    setPaymentFormData({ cashAmount: getTotal(onGoingInvoice) });
    // setShowApplyBtn(true);
  }
  function handelShowCashToggel() {
    setShowCashInput((prev) => !prev);
    setPaymentFormData({
      cashAmount: +0,
    });
  }
  // function setShowCustmerAccountToggel() {
  //   return setShowCustmerAccountInput((prev) => !prev);
  // }
  // function handelApplyDescount() {
  //   setPaymentInfo((prev) => ({
  //     ...prev,
  //     remaining:
  //       prev.remaining -
  //       (paymentFormData.custmerDescount / 100) * prev.remaining,
  //   }));
  //   setShowApplyBtn(false);
  // }
  // async function handelAddingToCustmerAcount() {
  //   let result;
  //   if (paymentFormData.custmerAccount == "none") {
  //     toast.warn("You Got To Chose One First ! ", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   } else {
  //     paymentInfo.remaining == 0
  //       ? toast.warn("Nothing Left To Add ", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: false,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         })
  //       : // Fake Add debts to custmer Account
  //         (result = await MySwal.fire({
  //           title: "Add To Custmer Account?",
  //           text: `This action will add The ${paymentInfo.remaining}$ To ${paymentFormData.custmerAccount} Account `,
  //           icon: "warning",
  //           showCancelButton: true,
  //           confirmButtonColor: "#E76F51",
  //           cancelButtonColor: "#264653",
  //           confirmButtonText: "Yes, Add It",
  //           cancelButtonText: "No, Do Not Add It",
  //         }));
  //     if (result.isConfirmed) {
  //       setPaymentInfo((prev) => ({
  //         ...prev,
  //         remaining: 0,
  //       }));
  //       MySwal.fire({
  //         title: "Amount Added successfully",
  //         text: `The amount Hase been successfully added To ${paymentFormData.custmerAccount}.`,
  //         icon: "success",
  //         confirmButtonColor: "#2A9D8F",
  //       });
  //     }
  //   }
  // }
  async function handelConfirmPayment() {
    var result;
    paymentInfo.remaining !== 0
      ? toast.warn(t("notPaid"), {
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
          title: t("confirmPayment") + "؟",
          text: t("confirmPayment"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#E76F51",
          cancelButtonColor: "#264653",
          confirmButtonText: t("yesConfirm"),
          cancelButtonText: t("noConfirm"),
        }));

    if (result.isConfirmed) {
      try {
        const invoice = {
          ...invoiceRelatedData,
          isSuspended: false,
          invoiceItems: onGoingInvoice.map((item) => {
            return {
              productId: item.id,
              unitItemId: item.unitItemId,
              qty: item.quantity,
              price: item.price,
            };
          }),
        };
        const responce = loaction.state?.isPending
          ? await updateInvoice(loaction.state.invoiceId, invoice)
          : await creatInvoice(invoice);
        setShowReceipt((prev) => !prev);
        setFinalInvoice({
          reciptDate: responce.date,
          invoiceID: responce.id,
        });
      } catch (error) {
        toast.warn(`${error.response.data.message || t("faildToSend")}`, {
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

  return (
    // There is A lot of props driling, Probably it will change
    <div className="home-container">
      <BarcodeScanner
        onQRScan={handleAddProductToInvoiceByCode}
        allProdcuts={availableProducts}
      />
      <ChooseProductModal
        products={productWithTheSameBarcode.current}
        open={modalIsOpen}
        handleAddProductToInvoice={handleAddProductToInvoice}
        handelCloseModel={handelCloseModel}
      />
      <Overlay showPayment={showPayment}>
        <PaymentPopupWindow
          startNewOrder={handelNewOrder}
          showReceipt={showReceipt}
          showPayment={showPayment}
          showCashInput={showCashInput}
          paymentInfo={paymentInfo}
          paymentFormData={paymentFormData}
          onGoingInvoice={onGoingInvoice}
          reciptDate={finalInvoice.reciptDate}
          invoiceID={finalInvoice.invoiceID}
          handelChange={handelChange}
          handelShowPayment={handelShowPayment}
          handelConfirmPayment={handelConfirmPayment}
          handelCheckCash={handelCheckCash}
          handelShowCashToggel={handelShowCashToggel}
        />
      </Overlay>
      <div className="invoice-section">
        {onGoingInvoice.length !== 0 ? (
          <OnGoingInvoice
            onShowPayment={handelShowPayment}
            onRemoveItemFromInvoice={handleRemoveItemFromInvoice}
            onPending={handelPendingOnGoinigInvoice}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onGoingInvoice={onGoingInvoice}
            onCancleOnGoinigInvoice={handelCancleOnGoinigInvoice}
            handleOpenCustmerScreen={handleOpenCustmerScreen}
          />
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
          lastClikedId={lastClikedProduct}
        />
      )}
    </div>
  );
}
