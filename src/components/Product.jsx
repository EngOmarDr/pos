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
      <img src={productImage} />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <h3 className="product-unitPrice">{unitPrice} $</h3>
      </div>
    </div>
  );
}
