import Product from "./Product";

export default function AvailableProducts({ products, onAddItem, isFilterOn }) {
  const productsCards =
    // products.lenght > 0 ? (
    products.map((product) => {
      return (
        <Product
          key={product.id}
          productFullInfo={product}
          id={product.id}
          name={product.name}
          // For Now we Will Leave The Price Like This maby we will chang it
          unitPrice={product.prices[0]?.price ?? 0}
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
