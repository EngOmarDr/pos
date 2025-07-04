import AvailableProducts from "./AvailableProducts";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

export default function ProductsSection({
  activeCatagoryID,
  filterdProducts,
  searchResult,
  handleAddProductToInvoice,
  availableProducts,
  availableGroups,
  handelActiveFilter,
  handelClearFilter,
  handelSerchSubmit,
  searchRef,
}) {
  let productsSectionContent;
  if (activeCatagoryID) {
    if (filterdProducts.length == 0) {
      productsSectionContent = (
        <h3 className="no-products">No Products By This Type At The store</h3>
      );
    } else {
      if (searchResult && searchResult.length != 0) {
        productsSectionContent = (
          <AvailableProducts
            products={searchResult}
            onAddItem={handleAddProductToInvoice}
          />
        );
      } else if (searchResult && searchResult.length == 0) {
        productsSectionContent = (
          <h3 className="no-products">No Product Match The Search Querry</h3>
        );
      } else {
        productsSectionContent = (
          <AvailableProducts
            products={filterdProducts}
            onAddItem={handleAddProductToInvoice}
          />
        );
      }
    }
  } else {
    if (availableProducts.length > 0) {
      if (searchResult && searchResult.length != 0) {
        productsSectionContent = (
          <AvailableProducts
            products={searchResult}
            onAddItem={handleAddProductToInvoice}
          />
        );
      } else if (searchResult && searchResult.length == 0) {
        productsSectionContent = (
          <h3 className="no-products">No Product Match The Search Querry</h3>
        );
      } else {
        productsSectionContent = (
          <AvailableProducts
            products={availableProducts}
            onAddItem={handleAddProductToInvoice}
          />
        );
      }
    } else {
      productsSectionContent = (
        <h3 className="no-products">No Products At The store</h3>
      );
    }
  }
  console.log(productsSectionContent);

  return (
    <div className="products-section">
      <div className="options">
        <Filters
          groupsTree={availableGroups}
          handelActiveFilter={handelActiveFilter}
          handelClearFilter={handelClearFilter}
          activeCatagoryId={activeCatagoryID}
        />
        <SearchBar
          onSearch={handelSerchSubmit}
          ref={searchRef}
          result={searchResult}
        />
      </div>
      <div className="products">{productsSectionContent}</div>
    </div>
  );
}
