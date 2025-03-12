import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";

export default function PendingInvoice({invoiceId ,date,  items , handelCancling, handelShowItems}){

    return (
        <div className="pending-invoice">
            <div className="info">
                <h2> Invoice Id: {invoiceId} </h2>
                <p> Invoice Date: {date}</p>
            </div>
            <div className="options">
                <button className="complete-btn">
                    <FaCheckCircle/> Complete
                </button>
                <button className="cancel-btn"onClick={()=>handelCancling()}>
                    <FaTimesCircle/> Cancle
                </button>
                <button className="show-btn" onClick={()=>handelShowItems(items)}>
                    <FaEye/> Show
                </button>
            </div>
        </div>
    )
}