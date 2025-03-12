import { FaCopy, FaEye, FaPrint } from "react-icons/fa";

export default function CompletedInvoice({invoiceId ,date, items, handelShowItems}){

    return (
        <div className="completed-invoice">
            <div className="info">
                <h2> Invoice Id: {invoiceId} </h2>
                <p> Invoice Date: {date}</p>
            </div>
            <div className="options">
                <button className="print-btn">
                    <FaPrint/> Print
                </button>
                <button className="copy-btn">
                    <FaCopy/> Copy
                </button>
                <button className="show-btn" onClick={()=>handelShowItems(items)}>
                    <FaEye/> Show
                </button>
            </div>
        </div>
    )
}