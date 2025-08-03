import { useEffect, useState } from "react";
import { CurrencyDenomination } from "../components/CurrencyDenomination";
import { currency } from "../utilities/dump";
import { FaCheck } from "react-icons/fa";
import { closeShift } from "../services/ShiftServices";

export default function ShiftClosePage() {
  const [error, setError] = useState();
  const [res, setRes] = useState();
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
      setError("insert cash");
      return;
    }
    try {
      const response = await closeShift(totalAmount);
      setError(false);
      setRes(response.endCash - response.startCash - response.expectedEndCash);
    } catch (error) {
      setError(error.response.data.message);
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
          {error && <span className="text-sm text-red-600">{error}</span>}
          <button className="check-total-btn flex items-center gap-x-2">
            Close Shift
          </button>
          {res && (
            <span className="text-sm text-green-600">
              {res > 0
                ? "يوجد زيادة في الصندوق بمقدار " + res
                : res < 0
                ? "يوجد نقص في الصندوق بمقدار " + res
                : "قيم الصندوق صحيحة"}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
