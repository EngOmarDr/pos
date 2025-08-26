import { useState } from "react";
import { startShift } from "../services/ShiftServices";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ShiftStartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState();
  async function handelSumbiting(e) {
    e.preventDefault();
    if (!inputValue) {
      setError(t("insertCash"));
      return;
    }
    try {
      await startShift(inputValue);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="shift-close-page">
      <div className="shift-close-section">
        <form onSubmit={handelSumbiting}>
          <div>
            <label htmlFor="my-text-input">{t("enterCash")}</label>
            <input
              type="number"
              id="my-text-input"
              value={inputValue}
              onChange={handleChange}
            />
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
          <button className="check-total-btn flex items-center gap-1">
            {t("startShift")}
          </button>
        </form>
      </div>
    </div>
  );
}
