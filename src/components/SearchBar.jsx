import { forwardRef } from "react";

const SearchBar = forwardRef(function SearchBar({ onSearch, result }, ref) {
  return (
    <form className="search-bar">
      <input type="text" name="search" ref={ref} />
      <p className="search-actions">
        <button id="search" onClick={onSearch}>
          Search
        </button>
        <button
          id="reset"
          className={result ? "visible" : ""}
          onClick={onSearch}
        >
          {/* for the animtion to work correctly*/}
          {result && "Reset"}
        </button>
      </p>
    </form>
  );
});

export default SearchBar;
