import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CurrencyDenomination } from "../components/CurrencyDenomination";
import { currency } from "../utilities/dump";
// import { FaCheck } from "react-icons/fa";
import { closeShift } from "../services/ShiftServices";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { priceFormatter } from "../utilities/priceFormatter";

export default function ShiftClosePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    currency.map((cur) => ({
      id: cur.id,
      currency: cur.currency,
      amount: 0,
    }))
  );
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      formData.reduce((cur, acc) => {
        return (
          cur +
          (isNaN(parseInt(acc.amount)) ? 0 : parseInt(acc.amount)) *
            acc.currency
        );
      }, 0)
    );
  }, [formData]);

  const currencyCategories = formData.map((cur) => {
    return (
      <CurrencyDenomination
        key={cur.id}
        value={cur.amount}
        currencyId={cur.id}
        currencyName={cur.currency}
        handelChangInput={handelChangInput}
        handelIncrease={handelIncrease}
        handelDecrease={handelDecrease}
      />
    );
  });

  function handelChangInput(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return prev.map((element) =>
        element.id == name ? { ...element, amount: value } : element
      );
    });
  }
  async function handelSumbiting(e) {
    e.preventDefault();
    if (totalAmount == 0) {
      toast.error(t("insertCash"), {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const response = await closeShift(totalAmount);
      const endCash = response.endCash;
      const startCash = response.startCash;
      const expectedEndCash = response.expectedEndCash;
      const finalBoxContent = endCash - startCash - expectedEndCash;
      const formatedFinalBoxContent = priceFormatter(
        finalBoxContent,
        "SAR",
        i18n.language === "ar" ? "ar-SA" : "en-US"
      );
      const toastText =
        finalBoxContent > 0
          ? t("increaseInBox") + formatedFinalBoxContent
          : finalBoxContent < 0
          ? t("decreaseInBox") + formatedFinalBoxContent
          : t("rightValues");
      toast.info(toastText, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("loginInfo");
      localStorage.removeItem("shiftIsStarted");
      navigate("/login", { replace: true });
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
  function handelIncrease(id) {
    setFormData((prev) => {
      return prev.map((element) =>
        element.id == id
          ? { ...element, amount: parseInt(element.amount) + 1 }
          : element
      );
    });
  }
  function handelDecrease(id) {
    setFormData((prev) => {
      return prev.map((element) =>
        element.id == id
          ? {
              ...element,
              amount: element.amount == 0 ? 0 : parseInt(element.amount) - 1,
            }
          : element
      );
    });
  }
  return (
    <div className="shift-close-page">
      <div className="shift-close-section">
        <h1>{t("enterDenomination")}</h1>
        <form onSubmit={handelSumbiting}>
          <div className="currency-denominations">{currencyCategories}</div>
          {totalAmount != 0 && (
            <h2 className="total-amount">
              {t("totalInvoicePrice")}:{" "}
              {priceFormatter(
                totalAmount,
                "SAR",
                i18n.language === "ar" ? "ar-SA" : "en-US"
              )}
            </h2>
          )}
          <button className="check-total-btn flex items-center gap-x-2">
            {t("closeShift")}
          </button>
        </form>
      </div>
    </div>
  );
}
