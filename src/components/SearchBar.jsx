import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const SearchBar = forwardRef(function SearchBar({ onSearch, result }, ref) {
  const { t } = useTranslation();
  return (
    <form className="search-bar">
      <input type="text" name="search" ref={ref} />
      <p className="search-actions">
        <button id="search" onClick={onSearch}>
          {t("search")}
        </button>
        <button
          id="reset"
          className={result ? "visible" : ""}
          onClick={onSearch}
        >
          {/* for the animtion to work correctly*/}
          {result && t("reset")}
        </button>
      </p>
    </form>
  );
});

export default SearchBar;
