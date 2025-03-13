import { useState } from "react"
import { CurrencyDenomination } from "../components/CurrencyDenomination"
import { currency } from "../utilities/dump"
import { FaCheck } from "react-icons/fa"

export default function ShiftClosePage(){
    const [formData,setFormData]= useState(currency.map(cur=>({
        id:cur.id,
        currency:cur.currency,
        amount:0
    })))

    const[totalAmount,setTotalAmount] = useState(0)

    const currencyCategories = formData.map(cur=>{
        return  <CurrencyDenomination
                    key={cur.id}
                    value={cur.amount}
                    currencyId={cur.id}
                    currencyName={cur.currency}
                    handelChangInput={handelChangInput}
                    handelIncrease={handelIncrease}
                    handelDecrease={handelDecrease}
                />
    })

    function handelChangInput(event){
        const {name,value} = event.target
        setFormData(prev=>{
            return prev.map(element=> element.id == name ? {...element,amount:value} :element)
        })
    }
    function handelSumbiting(e){
        e.preventDefault();
        setTotalAmount(formData.reduce((cur,acc)=>{
            return cur + (isNaN(parseInt(acc.amount))? 0: parseInt(acc.amount) )*acc.currency
        },0))
    }
    function handelIncrease(id){
        setFormData(prev=>{
            return prev.map(element=> element.id == id ? {...element,amount:parseInt(element.amount)+1} :element)
        })
    }
    function handelDecrease(id){
        setFormData(prev=>{
            return prev.map(element=> 
                element.id == id ? 
                {...element,amount:element.amount==0 ? 0 : parseInt(element.amount)-1} 
                :element
            )
        })
    }
    return (
        <div className="shift-close-page">
            <div className="shift-close-section">
                <h1>Enter The Amount Of Each Denomination: </h1>
                <form onSubmit={handelSumbiting}>
                    <div className="currency-denominations">
                        {currencyCategories}
                    </div>
                    <button className="check-total-btn">
                        <FaCheck/> Check Total
                    </button>
                </form>
                {totalAmount !=0  && <h2 className="total-amount">Total: {totalAmount}</h2>}
            </div>
        </div>
    )
}