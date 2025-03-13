import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

export function CurrencyDenomination({currencyId,currencyName,handelChangInput,handelIncrease,handelDecrease,value}){
    return (
        <div className="currency">
            <label htmlFor={`${currencyId}`}>{currencyName}</label>
            <div className="currency-input-filed">
                <button className='increase-btn' onClick={()=>handelIncrease(currencyId)}>
                    <FaPlusCircle/>
                </button>
                <input
                    name={`${currencyId}`} 
                    id={`${currencyId}`} 
                    type="number" min='0'
                    onChange={handelChangInput}
                    value={value}
                />
                <button className="decrease-btn" onClick={()=>handelDecrease(currencyId)}>
                    <FaMinusCircle/>
                </button>
            </div>
        </div>
    )
}