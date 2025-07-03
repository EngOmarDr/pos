export default function Category({ isActive, categoryName, onClick }) {
  return (
    <div
      className={`category ${isActive ? "active" : ""}`}
      onClick={() => {
        onClick(categoryName);
      }}
    >
      {categoryName}
    </div>
  );
}
