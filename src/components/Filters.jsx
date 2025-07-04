import { getLeafNodes } from "../utilities/getLeafNodes";
import Category from "./Category";

export default function Filters({
  groupsTree,
  handelActiveFilter,
  activeCatagoryId,
  handelClearFilter,
}) {
  const leafNodes = getLeafNodes(groupsTree);
  const filters = leafNodes.map((category) => {
    return (
      <Category
        key={category.id}
        id={category.id}
        categoryName={category.name}
        onClick={handelActiveFilter}
        isActive={activeCatagoryId === category.id ? true : false}
      />
    );
  });

  return (
    <div className="filters">
      {filters}
      <button className="clear-btn" onClick={handelClearFilter}>
        Clear
      </button>
    </div>
  );
}
