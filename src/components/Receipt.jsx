import { forwardRef } from "react";

function ReceiptComponent({ invoiceData }, ref) {
    const fixedTax = 20 
    function getTotal(){
        return (invoiceData.items.reduce((acc,cur)=>{
          return acc + cur.unitPrice * cur.quantity
        },0)+fixedTax).toFixed(2)
    }
    return (
        <div ref={ref} className="receipt">
        <h2>Receipt</h2>
        <p>Date: {invoiceData.date}</p>
        <p>Invoice ID: {invoiceData.invoiceId}</p>

        <table>
            <thead>
            <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {invoiceData.items.map((item, index) => (
                <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${(item.unitPrice * item.quantity).toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <h3>Tax: {`${fixedTax}$`}</h3>
        <h3>Total: {`${getTotal()} $`} </h3>
        <p>Thank you for shopping with us!</p>
        </div>
    );
}

export const Receipt = forwardRef(ReceiptComponent);