import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

export function CustmersDebt({name,debt,handelDebtClosure,handelShowDebtsInput}){
    return (
        <div className="custmer-debt">
            <div className="info">
                <h2> Custmer Name: {name} </h2>
                <p> Debt: {debt}</p>
            </div>
            <div className="options">
                <button className="debt-closure-btn" onClick={handelDebtClosure}>
                    <FaCheckCircle/> Debt Closure
                </button>
                <button className="pay-part-btn" onClick={handelShowDebtsInput}>
                    <FaMoneyBillWave/> Pay Off A Part
                </button>
            </div>
        </div>
    )
}