import {categories ,products} from '../utilities/dump.js'
import Category from '../components/Category.jsx'
import { useState } from 'react'
import Product from '../components/Product.jsx'
import { EmptyInvoice } from '../components/EmptyInvoice.jsx'
import { 
  FaCheckCircle, 
  FaClock, 
  FaMinusCircle, 
  FaPlusCircle, 
  FaTimesCircle, 
  FaTrashAlt } 
  from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function HomePage(){
  const [activeCatagory,setActiveCatagory] = useState(null)
  const [onGoingInvoice,setOnGoingInvoice] = useState([])
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
  const fixedTax = 20
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
          <td >{(onGoingInvoice.reduce((acc,cur)=>{
            return acc + cur.unitPrice * cur.quantity
          },0) + fixedTax).toFixed(2)}$
          </td>
        </tr>
      </tfoot>
    </table>
  return (
    <div className="home-container">
      <div className="invoice-section">
        {
          onGoingInvoice.length !== 0
          ? (
            <div className='invoice-body'>
              <div className='invoice-items'>
                {currentInvoiceItems}
              </div>
              <div className='invoice-options'>
                <button className='pend-btn'>
                  <FaClock/> Pend Invoice
                </button>
                <button className='complete-btn'>
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