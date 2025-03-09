export default function Product(props){
    return (
        <div className="product-card" onClick={()=>{props.onClick(props.productFullInfo)}}>
            <img src={props.productImage}/>
            <div className="product-info">
                <h3 className="product-name">{props.name}</h3>
                <h3 className="product-unitPrice">{props.unitPrice} $</h3>
            </div>
        </div>
    )
}