import noImage from "../assets/no-image.png";

export default function Product({
  onClick,
  productFullInfo,
  productImage,
  name,
}) {
  return (
    // <div
    //   className="product-card"
    //   onClick={() => {
    //     onClick(productFullInfo);
    //   }}
    // >
    //   {productImage ? (
    //     <img
    //       style={{ borderRadius: "6px" }}
    //       src={`http://localhost:8080${productImage}`}
    //     />
    //   ) : (
    //     <img
    //       style={{ borderRadius: "6px",objectFit:'fill' }}
    //       src={noImage}
    //     />
    //   )}
    //   {/* <img src={`http://localhost:8080${productImage}`} /> */}
    //   <div className="product-info">
    //     <h3 className="product-name"> Poduct Name: {name}</h3>
    //     <h3 className="product-unitPrice">Unit Price: {unitPrice} S.P</h3>
    //   </div>
    // </div>
    <div
      className="max-w-sm rounded overflow-hidden shadow-sm hover:scale-105 transition-transform h-44"
      onClick={() => onClick(productFullInfo)}
    >
      {productImage ? (
        <img
          className="w-full h-36 object-cover"
          src={productImage.includes('http') ? productImage : 'http://localhost:8080' + productImage}
          alt="product image"
        />
      ) : (
        <img
          className="w-full h-36 object-contain"
          src={noImage}
          alt="product image"
        />
      )}
      <div className="px-2 h-8 bg-zinc-200">
        <p className="text-lg font-semibold">{name}</p>
      </div>
    </div>
  );
}
