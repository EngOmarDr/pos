export default function Category({ isActive, id, categoryName, onClick }) {
  return (
    <div
      className={`category ${isActive ? "active" : ""}`}
      onClick={() => {
        onClick(id);
      }}
    >
      {categoryName}
    </div>
  );
}
