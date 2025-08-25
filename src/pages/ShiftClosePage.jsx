import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CurrencyDenomination } from "../components/CurrencyDenomination";
import { currency } from "../utilities/dump";
// import { FaCheck } from "react-icons/fa";
import { closeShift } from "../services/ShiftServices";
import { useNavigate } from "react-router-dom";

export default function ShiftClosePage() {
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
      toast.error("insert cash", {
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
      const toastText =
        finalBoxContent > 0
          ? "يوجد زيادة في الصندوق بمقدار " + finalBoxContent
          : finalBoxContent < 0
          ? "يوجد نقص في الصندوق بمقدار " + finalBoxContent
          : "قيم الصندوق صحيحة";
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
        <h1>Enter The Amount Of Each Denomination: </h1>
        <form onSubmit={handelSumbiting}>
          <div className="currency-denominations">{currencyCategories}</div>
          {totalAmount != 0 && (
            <h2 className="total-amount">Total: {totalAmount}</h2>
          )}
          <button className="check-total-btn flex items-center gap-x-2">
            Close Shift
          </button>
        </form>
      </div>
    </div>
  );
}
