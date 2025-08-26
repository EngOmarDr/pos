import AvailableProducts from "./AvailableProducts";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  let productsSectionContent;
  if (activeCatagoryID) {
    if (filterdProducts.length == 0) {
      productsSectionContent = (
        <h3 className="no-products">{t("noProductsByType")}</h3>
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
          <h3 className="no-products">{t("noProductMatchQuerry")}</h3>
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
          <h3 className="no-products">{t("noProductMatchQuerry")}</h3>
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
        <h3 className="no-products">{t("noProductsAtStore")}</h3>
      );
    }
  }
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
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,180px),1fr))] p-3">
        {productsSectionContent}
      </div>
    </div>
  );
}
