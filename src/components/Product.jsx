import noImage from "../assets/no-image.png";

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
      {productImage ? (
        <img
          style={{ borderRadius: "6px" }}
          src={`http://localhost:8080${productImage}`}
        />
      ) : (
        <img
          style={{ borderRadius: "6px",objectFit:'fill' }}
          src={noImage}
        />
      )}
      {/* <img src={`http://localhost:8080${productImage}`} /> */}
      <div className="product-info">
        <h3 className="product-name"> Poduct Name: {name}</h3>
        <h3 className="product-unitPrice">Unit Price: {unitPrice} S.P</h3>
      </div>
    </div>
  );
}
