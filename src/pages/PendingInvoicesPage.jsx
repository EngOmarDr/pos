import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PendingInvoice from "../components/PendingInvoice"
import { pendingInvoices } from "../utilities/dump"
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

export default function PendingInvoicesPage(){
    const [showInvoiceItems,setShowInvoiceItems] = useState(false)
    const [showenInviceItems,setShowenInviceItems] = useState([])

    const testInvoices = pendingInvoices.map((invoice) =>{
        return  <PendingInvoice
                    key={invoice.invoiceId}
                    invoiceId={invoice.invoiceId}
                    date={invoice.date}
                    items={invoice.items}
                    handelCancling={handelCancelingInvoice}
                    handelShowItems={handelShowItems}
                />
    })

    const MySwal = withReactContent(Swal)

    async function handelCancelingInvoice(){
        const result = await MySwal.fire({
            title: 'Cancel Invoice?',
            text: "This action cannot be undone. All items in this invoice will be lost.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E76F51',
            cancelButtonColor: '#264653',
            confirmButtonText: 'Yes, Cancel It',
            cancelButtonText: "No, Keep It",
        });
        if(result.isConfirmed){
        MySwal.fire({
            title:'Invoice Canceled',
            text:'The invoice has been successfully removed.',
            icon:'success',
            confirmButtonColor:'#2A9D8F'
        });
        }
    }
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
    const pendInvoiceItems = 
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
        <div className='pending-invoice-page'>
            <div className="pending-invoice-section">
                {testInvoices}
                <div className={`popup-overlay ${showInvoiceItems ? 'show' : 'hide'}`}>
                    <button className='close-btn' onClick={()=>handelClosePopup()}><FaTimes/></button>
                    {pendInvoiceItems}
                </div>
            </div>
        </div>
    )
}