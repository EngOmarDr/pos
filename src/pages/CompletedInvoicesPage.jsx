import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { pendingInvoices } from "../utilities/dump"
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import CompletedInvoice from '../components/CompletedInvoice'
import { useNavigate } from 'react-router-dom'

export default function CompletedInvoicesPage(){
    const [showInvoiceItems,setShowInvoiceItems] = useState(false)
    const [showenInviceItems,setShowenInviceItems] = useState([])
    const navigate = useNavigate()

    const complatedInvoices = pendingInvoices.map((invoice) =>{
        return  <CompletedInvoice
                    key={invoice.invoiceId}
                    invoiceId={invoice.invoiceId}
                    date={invoice.date}
                    items={invoice.items}
                    handelShowItems={handelShowItems}
                    handelReturnGoods={handelReturnGoods}
                />
    })

    const MySwal = withReactContent(Swal)

    function handelShowItems(items){
        setShowInvoiceItems(prev=>!prev)
        setShowenInviceItems(items)
    }
    function handelClosePopup(){
        setShowInvoiceItems(prev=>!prev)
        setShowenInviceItems([])
    }
    async function handelReturnGoods(){
        const result = await MySwal.fire({
            title: 'Return Goods From Invoice',
            text: "This action Will Return Goods From Completed Invoice",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E76F51',
            cancelButtonColor: '#264653',
            confirmButtonText: 'Return Whole Invoice',
            cancelButtonText: "Return Some Goods",
        });
        if(result.isConfirmed){
        MySwal.fire({
            title:'Invoice Has Been Return !',
            text:'All Goods Has been Return To The Shop Completly',
            icon:'success',
            confirmButtonColor:'#2A9D8F'
        });
        }
        else if(result.isDismissed){
            navigate("/",{replace: true})
            }
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