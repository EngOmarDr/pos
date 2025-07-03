export default function Product({
  onClick,
  productFullInfo,
  productImage,
  name,
  unitPrice,
}) {
  return (
    <div
      className="product-card"
      onClick={() => {
        onClick(productFullInfo);
      }}
    >
      <img src={`http://localhost:8080${productImage}`} />
      <div className="product-info">
        <h3 className="product-name"> Poduct Name: {name}</h3>
        <h3 className="product-unitPrice">Unit Price: {unitPrice} $</h3>
      </div>
    </div>
  );
}
