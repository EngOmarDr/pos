import { useTranslation } from "react-i18next";
import noImage from "../assets/no-image.png";
import { priceFormatter } from "../utilities/priceFormatter";

export default function Product({
  onClick,
  productFullInfo,
  productImage,
  name,
  unitPrice,
  isHighlighted,
}) {
  const { i18n } = useTranslation();
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
      className={`bg-white rounded-xl overflow-hidden shadow-sm 
             hover:shadow-md hover:scale-105 active:scale-95 
             transition-transform transition-shadow duration-200 cursor-pointer
             ${
               isHighlighted
                 ? "border-2 border-emerald-500 animate-pulse"
                 : "border border-transparent"
             }`}
      onClick={() => onClick(productFullInfo)}
    >
      {productImage ? (
        <img
          className="w-full h-32 object-cover"
          src={
            productImage.includes("http")
              ? productImage
              : "http://localhost:8080" + productImage
          }
          alt={name}
        />
      ) : (
        <img
          className="w-full h-32 object-contain p-2"
          src={noImage}
          alt="No product"
        />
      )}
      <div className="px-2 py-1 bg-gray-100 flex flex-col justify-center">
        <p className="text-sm font-semibold truncate">{name}</p>
        {/* Optional price/stock */}
        <p className="text-xs text-gray-500">
          {priceFormatter(
            unitPrice ?? 0,
            "SAR",
            i18n.language === "ar" ? "ar-SA" : "en-US"
          )}
        </p>
      </div>
    </div>
  );
}
