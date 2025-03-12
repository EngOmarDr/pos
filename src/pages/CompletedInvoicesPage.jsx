import { pendingInvoices } from "../utilities/dump"
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import CompletedInvoice from '../components/CompletedInvoice'

export default function CompletedInvoicesPage(){
    const [showInvoiceItems,setShowInvoiceItems] = useState(false)
    const [showenInviceItems,setShowenInviceItems] = useState([])

    const complatedInvoices = pendingInvoices.map((invoice) =>{
        return  <CompletedInvoice
                    key={invoice.invoiceId}
                    invoiceId={invoice.invoiceId}
                    date={invoice.date}
                    items={invoice.items}
                    handelShowItems={handelShowItems}
                />
    })

    function handelShowItems(items){
        setShowInvoiceItems(prev=>!prev)
        setShowenInviceItems(items)
    }
    function handelClosePopup(){
        setShowInvoiceItems(prev=>!prev)
        setShowenInviceItems([])
    }
    const fixedTax = 20
    function getTotal(){
        return (showenInviceItems.reduce((acc,cur)=>{
          return acc + cur.unitPrice * cur.quantity
        },0)+fixedTax).toFixed(2)
    }
    const complatedInvoiceItems = 
    <table>
        <caption>Invoice Items</caption>
        <thead>
        <tr>
            <td>Name</td>
            <td>Unit Price</td>
            <td>Quantity</td>
            <td>Total</td>
        </tr>
        </thead>
        <tbody>
        {
            showenInviceItems.map(item=>{
            return <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.unitPrice}$</td>
                        <td className='quantity'>{item.quantity}</td>
                        <td>{(item.unitPrice * item.quantity).toFixed(2)}$</td>
                    </tr>
            })
        }
        </tbody>
        <tfoot>
        <tr>
            <td colSpan={3}>Taxes:</td>
            <td>{fixedTax}$</td>
        </tr>
        <tr>
            <td colSpan={3}>Total:</td>
            <td >{getTotal()}$</td>
        </tr>
        </tfoot>
    </table>

    return (
        <div className='complated-invoice-page'>
            <div className="complated-invoice-section">
                {complatedInvoices}
                <div className={`popup-overlay ${showInvoiceItems ? 'show' : 'hide'}`}>
                    <button className='close-btn' onClick={()=>handelClosePopup()}><FaTimes/></button>
                    {complatedInvoiceItems}
                </div>
            </div>
        </div>
    )
}