import { FaCopy, FaEye, FaPrint, FaUndoAlt } from "react-icons/fa";

export default function CompletedInvoice({invoiceId ,date, items, handelShowItems, handelReturnGoods}){

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
                <button className="return-btn" onClick={handelReturnGoods}>
                    <FaUndoAlt /> Return
                </button>
            </div>
        </div>
    )
}