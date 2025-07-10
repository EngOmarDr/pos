import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
export default function PaymentSection({
  handelShowCashToggel,
  showCashInput,
  paymentFormData,
  handelChange,
  handelCheckCash,
  paymentInfo,
  handelConfirmPayment,
}) {
  return (
    <div className="payment-section">
      <div className="process-info">
        <h2>Choise A Pyment Methode :</h2>
        <p>You Can Chosie More Than one </p>
      </div>
      {/* <div className="custmer-discount">
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
                </div> */}
      <div className="payment-methods">
        <button className="cash-btn" onClick={() => handelShowCashToggel()}>
          <FaMoneyBillWave className="btn-icon" /> Cash
        </button>
        {/* <button
                    className="custmer-account-btn"
                    onClick={() => setShowCustmerAccountToggel()}
                  >
                    <FaUserCircle className="btn-icon" /> Custmer Account
                  </button> */}
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
        {/* {showCustmerAccountInput && (
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
                  )} */}
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
  );
}
