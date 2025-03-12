import {categories ,pendingInvoices,products, specialCustmers} from '../utilities/dump.js'
import Category from '../components/Category.jsx'
import { useRef, useState } from 'react'
import Product from '../components/Product.jsx'
import { EmptyInvoice } from '../components/EmptyInvoice.jsx'
import { 
  FaCheckCircle, 
  FaClock, 
  FaMinusCircle, 
  FaMoneyBillWave, 
  FaPlusCircle, 
  FaPrint, 
  FaTags, 
  FaTimes, 
  FaTimesCircle, 
  FaTrashAlt, 
  FaUserCircle} 
  from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print'
import {Receipt}  from '../components/Receipt.jsx'

export default function HomePage(){
  const fixedTax = 20
  const receiptRef = useRef()
  console.log(receiptRef.current);
  
  const [activeCatagory,setActiveCatagory] = useState(null)
  const [onGoingInvoice,setOnGoingInvoice] = useState([])
  const [showPayment,setShowPayment] = useState(false)
  const [showCashInput,setShowCashInput] = useState(false)
  const [showCustmerAccountInput,setShowCustmerAccountInput] = useState(false)
  const [paymentInfo,setPaymentInfo] = useState({
    remaining: 0,
    chang:0,
  })
  const[paymentFormData,setPaymentFormData] = useState({
    cashAmount: 0,
    custmerAccount:'none',
    custmerDescount:0,
  })
  const [showApplyBtn,setShowApplyBtn] = useState(true)
  const [showReceipt,setShowReceipt] = useState(false)
  const filters = categories.map((category)=>{
    return  <Category
              key={category.name}
              id={category.id}
              categoryName={category.name}
              onClick = {handelActiveFilter}
              isActive = {activeCatagory === category.name ? true : false}
            />
  })  
  const availableProducts =
    activeCatagory !== null
    ? products.filter((product)=>{
        return product.category == activeCatagory ? product : null
    }).map((product)=>{
      return  <Product
                key={product.id}
                id={product.id}
                name={product.name}
                unitPrice={product.unitPrice}
                productImage={product.productImage}
            />
    })
    : products.map((product)=>{
        return  <Product
                  key={product.id}
                  productFullInfo={product}
                  id={product.id}
                  name={product.name}
                  unitPrice={product.unitPrice}
                  productImage={product.productImage}
                  onClick= {handleAddProductToInvoice}
                />
      })

  const MySwal = withReactContent(Swal)
  function handelActiveFilter(name){
    setActiveCatagory(name)
  }
  function handelCheckCash(){
    paymentFormData.cashAmount < paymentInfo.remaining 
    ? setPaymentInfo(prev=>({
      ...prev,
      remaining: prev.remaining - paymentFormData.cashAmount
    }))
    : setPaymentInfo(prev=>({
      remaining: 0,
      chang: paymentFormData.cashAmount - prev.remaining + prev.chang
    }))
  }
  function getTotal(){
    return (onGoingInvoice.reduce((acc,cur)=>{
      return acc + cur.unitPrice * cur.quantity
    },0)+fixedTax).toFixed(2)
  }
  
  function handelClearFilter(){
    setActiveCatagory(null)
  }

  function handleAddProductToInvoice(product){
    setOnGoingInvoice(prev=>{
      let isExist = prev.some(pro=> pro.name == product.name)  
      return isExist 
      ? prev.map(pro => {
        return pro.name == product.name ? {...pro,quantity: pro.quantity+1} : pro
      }) 
      :[...prev,{
        id:product.id,
        name:product.name,
        category:product.category,
        unitPrice:product.unitPrice,
        quantity:1,
      }]
    })
  }
  function handleRemoveItemFromInvoice(id){
    setOnGoingInvoice(prev=>prev.filter(product=>product.id !== id))
  }
  function handleIncreaseQuantity(id){
    setOnGoingInvoice(prev=>{
      return prev.map(pro => {
        return pro.id == id ? {...pro,quantity: pro.quantity+1} : pro
      })
    })
  }
  function handleDecreaseQuantity(id){
    let isLastItem = onGoingInvoice.some(pro=> pro.id == id && pro.quantity == 1)
    isLastItem ? handleRemoveItemFromInvoice(id)
    : setOnGoingInvoice(prev=>{
      return prev.map((pro=>{
        return (pro.id == id && pro.quantity > 1 )? {...pro,quantity: pro.quantity-1} : pro
      }))
    })
  }
  async function handelCancleOnGoinigInvoice() {
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
      setOnGoingInvoice([])
      MySwal.fire({
        title:'Invoice Canceled',
        text:'The invoice has been successfully removed.',
        icon:'success',
        confirmButtonColor:'#2A9D8F'
    });
    }
  }
  async function handelPendingOnGoinigInvoice() {
    const result = await MySwal.fire({
      title: 'Pend Invoice?',
      text: "This action will pend This ongoing Invoice.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E76F51',
      cancelButtonColor: '#264653',
      confirmButtonText: 'Yes, Pend It',
      cancelButtonText: "No, Keep It",
  });
    if(result.isConfirmed){
      setOnGoingInvoice([])
      MySwal.fire({
        title:'Invoice Pended',
        text:'The invoice has been successfully pended.',
        icon:'success',
        confirmButtonColor:'#2A9D8F'
    });
    }
  }
  function handelChange(event) {
    const {name , value} = event.target
    setPaymentFormData(prev=> ({
      ...prev,
      [name] : value
    }))
  }
  function handelShowPayment(){
      setShowPayment(prev=>!prev)
      setPaymentInfo(()=>({
        remaining:getTotal(),
        chang:0
      }))
      setPaymentFormData({
        cashAmount: 0,
        custmerAccount:'none',
        custmerDescount:0,
      })
      setShowApplyBtn(true)
  }
  function handelShowCashToggel(){
    return setShowCashInput(prev=>!prev)
  }
  function setShowCustmerAccountToggel(){
    return setShowCustmerAccountInput(prev=>!prev)
  }
  function handelApplyDescount(){
    setPaymentInfo(prev=>({
      ...prev,
      remaining: prev.remaining - (paymentFormData.custmerDescount/100 * prev.remaining)
    }))
    setShowApplyBtn(false)
  }
  async function handelAddingToCustmerAcount(){
    let result;
    if(paymentFormData.custmerAccount == 'none'){
      toast.warn('You Got To Chose One First ! ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      paymentInfo.remaining == 0
      ? toast.warn('Nothing Left To Add ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        // Fake Add debts to custmer Account 
      : result = await MySwal.fire({
        title: 'Add To Custmer Account?',
        text: `This action will add The ${paymentInfo.remaining}$ To ${paymentFormData.custmerAccount} Account `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E76F51',
        cancelButtonColor: '#264653',
        confirmButtonText: 'Yes, Add It',
        cancelButtonText: "No, Do Not Add It",
    })
      if(result.isConfirmed){
        setPaymentInfo(prev=>({
          ...prev,
          remaining:0
        }))
        MySwal.fire({
          title:'Amount Added successfully',
          text:`The amount Hase been successfully added To ${paymentFormData.custmerAccount}.`,
          icon:'success',
          confirmButtonColor:'#2A9D8F'
      });
      }
    }
  }
  async function handelConfirmPayment(){
    var result
    paymentInfo.remaining  !== 0 
    ? toast.warn('Amount has not been paid yet ! ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
    : result = await MySwal.fire({
      title: 'Confirm Payment?',
      text: "This action will Confirm Payment and Complet The Invoice",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E76F51',
      cancelButtonColor: '#264653',
      confirmButtonText: 'Yes, Confirm It',
      cancelButtonText: "No, don't Confirm It ",
  });
    if(result.isConfirmed){
      setShowReceipt(prev=>!prev)
    //   MySwal.fire({
    //     title:'Payment Completed',
    //     text:'The Payment has been successfully Completed.',
    //     icon:'success',
    //     confirmButtonColor:'#2A9D8F'
    // });
    }
  }
  function handelNewOrder(){
      setOnGoingInvoice([])
      setShowPayment(prev=>!prev)
      setShowReceipt(prev=>!prev)
  }
  const handelPrinting = useReactToPrint({
    contentRef: receiptRef,
  })
  const currentInvoiceItems = 
    <table>
      <caption>Invoice Items</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Unit Price</td>
          <td>Quantity</td>
          <td>Total</td>
          <td>Remove</td>
        </tr>
      </thead>
      <tbody>
        {
          onGoingInvoice.map(product=>{
            return <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.unitPrice}$</td>
                      <td className='quantity'>
                        <FaPlusCircle className='plus-circle' onClick={()=>handleIncreaseQuantity(product.id)}/>
                        {product.quantity}
                        <FaMinusCircle className='minus-circle' onClick={()=>handleDecreaseQuantity(product.id)}/>
                      </td>
                      <td>{(product.unitPrice * product.quantity).toFixed(2)}$</td>
                      <td className='trash-can'><FaTrashAlt onClick={()=>handleRemoveItemFromInvoice(product.id)}/></td>
                  </tr>
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Taxes:</td>
          <td>{fixedTax}$</td>
        </tr>
        <tr>
          <td colSpan={4}>Total:</td>
          <td >{getTotal()}$
          </td>
        </tr>
      </tfoot>
    </table>

    const finalInvoiceItems =
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
        onGoingInvoice.map(product=>{
          return <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.unitPrice}$</td>
                    <td className='quantity'>{product.quantity}</td>
                    <td>{(product.unitPrice * product.quantity).toFixed(2)}$</td>
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
        <td >{getTotal()}$
        </td>
      </tr>
    </tfoot>
  </table>

  const receiptSection = 
          <div className='receipt-section'>
            <h2>Payment Has Completed successfully <FaCheckCircle className='check-svg'/> </h2>
            <div className='options'>
              <button className='print-btn' onClick={handelPrinting}> 
                <FaPrint/> Print Receipt
              </button>
              <button className='new-order-btn' onClick={()=>handelNewOrder()}> 
                <FaPlusCircle/> New Order
              </button>
            </div>
            {/* Test With Invoice From dump.sj */}
            <div style={{ display: "none" }}>
              <Receipt ref={receiptRef} invoiceData={pendingInvoices[0]} />
            </div>
          </div>
  return (
    <div className="home-container">
      <div className={`popup-overlay ${showPayment ? 'show' : 'hide'}`}>
        <div className={`popup-payment-window ${!showPayment ? 'hide' : ''}`}>
          <div className='final-invoice-section'>
            {finalInvoiceItems}
          </div>
          {
            showReceipt 
            ? receiptSection
            : <>
                <div className='payment-section'>
                <div className='process-info'>
                  <h2>Choise A Pyment Methode :</h2>
                  <p>You Can Chosie More Than one </p>
                </div>
              <div className='custmer-discount'>
                  {showApplyBtn && 
                  <>
                    <label htmlFor='custmerDescount'>Apply Custmer Discount:</label>
                    <select 
                    id='custmerDescount' 
                    name='custmerDescount' 
                    onChange={handelChange}
                    value={paymentFormData.custmerDescount}
                    >
                      {
                        specialCustmers.map(custmer=>{
                          return  <option key={custmer.id} value={custmer.dicount}>
                                    {custmer.name}
                                  </option>
                        })
                      }
                    </select>
                  </>
                  }
                  {paymentFormData.custmerDescount > 0 && showApplyBtn
                  &&  <div className='apply-descount'>
                        <span> you have a descount of {paymentFormData.custmerDescount}%</span>
                        <button onClick={()=>{handelApplyDescount()}} className='apply-descount-btn'>
                          <FaTags className="btn-icon" /> Apply
                        </button>
                      </div>
                  }
                </div>
                <div className='payment-methods'>
                  <button className='cash-btn' onClick={()=>handelShowCashToggel()}>
                    <FaMoneyBillWave className="btn-icon" /> Cash
                  </button>
                  <button className='custmer-account-btn' onClick={()=>setShowCustmerAccountToggel()}>
                  <FaUserCircle className="btn-icon" /> Custmer Account
                  </button>
                </div>
                <div className='payments'>
                  {
                  showCashInput &&
                  (
                    <div className='cash-method'>
                      <label htmlFor='cashAmount'>Enter An Amount:</label>
                      <input 
                        id='cashAmount' 
                        name='cashAmount' 
                        value={paymentFormData.cashAmount} 
                        onChange={handelChange} 
                        type='number' 
                        min='0'
                      />
                      <button onClick={()=>handelCheckCash()} className='check-cash-btn'>
                      <FaCheckCircle className="btn-icon" /> check
                      </button>
                    </div>
                  )
                  }
                  {
                  showCustmerAccountInput &&
                  (
                    <div className='custmer-Account-method'>
                      <label htmlFor='custmerAccount'>Choise A Custmer:</label>
                      <select 
                        id='custmerAccount' 
                        name='custmerAccount' 
                        onChange={handelChange}
                        value={paymentFormData.custmerAccount}
                      >
                        {
                          specialCustmers.map(custmer=>{
                            return  <option key={custmer.id} value={custmer.name}>
                                      {custmer.name}
                                    </option>
                          })
                        }
                      </select>
                      <button className='add-to-custmer-acount-btn' onClick={()=>handelAddingToCustmerAcount()} > 
                        <FaPlusCircle/> Add Remaning To Custmer Acount 
                      </button>
                      <ToastContainer/>
                    </div>
                  )
                  }
                  <div className='process-calculation'>
                    <h2 className='pyment-remaining'>Remaining:{paymentInfo.remaining} </h2>
                    <h2 className='pyment-change'>chang:{paymentInfo.chang}</h2>
                    <button className='confirm-btn' onClick={()=>handelConfirmPayment()}>
                      <FaCheckCircle/> Confirm Payment
                      <ToastContainer/>
                    </button>
                  </div>
                </div>
              </div>
              <button className='close-btn' onClick={()=>handelShowPayment()}><FaTimes/></button>
              </>
          }
        </div>
      </div>
      <div className="invoice-section">
        {
          onGoingInvoice.length !== 0
          ? (
            <div className='invoice-body'>
              <div className='invoice-items'>
                {currentInvoiceItems}
              </div>
              <div className='invoice-options'>
                <button className='pend-btn' onClick={()=>handelPendingOnGoinigInvoice()}>
                  <FaClock/> Pend Invoice
                </button>
                <button className='complete-btn' onClick={()=>{handelShowPayment()}}>
                  <FaCheckCircle/> Complete Invoice
                </button>
                <button onClick={()=>handelCancleOnGoinigInvoice()} className='cancel-btn'>
                  <FaTimesCircle/> Cancle Invoice
                </button>
              </div>
            </div>
          )
          :<EmptyInvoice/>
        }
      </div>
      <div className="products-section">
        <div className='options'>
          <div className='filters'>
            {filters}
            <button className='clear-btn' onClick={()=>{handelClearFilter()}}>Clear</button>
          </div>
          <form className='search-bar'>
            <input type='search'/>
            <button>Search</button>
          </form>
        </div>
        <div className='products'>
          {availableProducts}
        </div>
      </div>
    </div>
  )
}