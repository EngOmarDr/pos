import { useEffect, useState } from "react";
import { fetchInvoiceTypeData } from "../services/InvoiceServices";
import { getPrice } from "../utilities/getPrice";
import Product from "./Product";

export default function AvailableProducts({
  products,
  onAddItem,
  lastClikedId,
  isFilterOn,
}) {
  // I think there is a better way of doing it : )
  const [invoiceType, setInvoiceType] = useState();
  useEffect(() => {
    fetchInvoiceTypeData().then((e) => {
      setInvoiceType(e);
    });
  }, []);
  const productsCards =
    // products.lenght > 0 ? (
    products.map((product) => {
      let productFromPrice = getPrice(product, invoiceType);
      return (
        <Product
          key={product.id}
          productFullInfo={product}
          isHighlighted={lastClikedId === product.id}
          id={product.id}
          name={product.name}
          // For Now we Will Leave The Price Like This maby we will chang it
          unitPrice={productFromPrice?.price ?? 0}
          productImage={product.image}
          onClick={onAddItem}
        />
      );
    });
  // ) : (
  //   <h3>No Products {isFilterOn && "By This Type "} At The store</h3>
  // );
  return <>{productsCards}</>;
}
