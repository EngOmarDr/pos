import { FaShoppingCart } from 'react-icons/fa'

export function EmptyInvoice(){
    return(
        <div className='empty-invoice'>
            <FaShoppingCart className='empty-icon'/>
            <p className='main-text'>No Active Invoice</p>
            <p className='sub-text'>Click a product or scan a QR code to start a new sale</p>
        </div>
    )
}