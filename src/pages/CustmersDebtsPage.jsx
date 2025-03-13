import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CustmersDebt } from '../components/CustmerDebt'
import {specialCustmers} from '../utilities/dump'
import { useState } from 'react'

export default function CustmersDebtsPage(){

    const [showDebtsInput,setShowDebtsInput] = useState(false)
    const custmers =  specialCustmers.map(custmer=>{
        return  custmer.name != 'none' 
                &&
                <CustmersDebt
                    key={custmer.id}
                    name={custmer.name}
                    debt={custmer.debt}
                    handelDebtClosure={handelDebtClosure}
                    handelShowDebtsInput={handelShowDebtsInput}
                />
    })
    const MySwal = withReactContent(Swal)

    async function handelDebtClosure(){
        const result = await MySwal.fire({
            title: 'Close The Debts?',
            text: "This action Will Empty The Custmer Debts Account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E76F51',
            cancelButtonColor: '#264653',
            confirmButtonText: 'Yes, Empty It',
            cancelButtonText: "No, Keep It",
        });
        if(result.isConfirmed){
        MySwal.fire({
            title:'Custmer Debts Has Been paid',
            text:'',
            icon:'success',
            confirmButtonColor:'#2A9D8F'
        });
        }
    }
    function handelShowDebtsInput(){
        setShowDebtsInput(prev=>!prev)
    }
    async function handelPayOffPartOfDebt(){
        const result = await MySwal.fire({
            title: 'Pay Off A Part Of The Debts?',
            text: "This action Will cut The Amount From The Custmer Debts Account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E76F51',
            cancelButtonColor: '#264653',
            confirmButtonText: 'Yes, Pay off',
            cancelButtonText: "No , Do't pay",
        });
        if(result.isConfirmed){
        setShowDebtsInput(prev=>!prev)
        MySwal.fire({
            title:'Amount Has Been Cut Off From The Custmer Debts Account',
            text:'',
            icon:'success',
            confirmButtonColor:'#2A9D8F'
        });
        }
    }
    return (
        <div className='custmers-debts-page'>
            <div className='custmers-debts-section'>
                <div className={`popup-overlay ${showDebtsInput ? 'show' : 'hide'}`}>
                    <div className='debts-amount'>
                        <label htmlFor='debts-amount'>
                            Enter The Amount Of Mony The Custmer Want To Pay Off
                        </label>
                        <input type='number' min='0' />
                        <button className='pay-off-btn' onClick={handelPayOffPartOfDebt}>Pay Off</button>
                        <button className='cancel-btn' onClick={handelShowDebtsInput}>Cancle</button>
                    </div>
                </div>
                {custmers}
            </div>
        </div>
    )
}