import { useTranslation } from "react-i18next";
import { getLeafNodes } from "../utilities/getLeafNodes";
import Category from "./Category";

export default function Filters({
  groupsTree,
  handelActiveFilter,
  activeCatagoryId,
  handelClearFilter,
}) {
  const { t } = useTranslation();
  const leafNodes = getLeafNodes(groupsTree);
  // const filters = leafNodes.map((category) => {
  //   return (
  //     <Category
  //       key={category.id}
  //       id={category.id}
  //       categoryName={category.name}
  //       onClick={handelActiveFilter}
  //       isActive={activeCatagoryId === category.id ? true : false}
  //     />
  //   );
  // });

  return (
    <div className="filters">
      <select onChange={(e) => handelActiveFilter(+e.target.value)}>
        <option value="">All Groups</option>
        {leafNodes.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
      {/* {filters} */}
      <button className="clear-btn" onClick={handelClearFilter}>
        {t("clear")}
      </button>
    </div>
  );
}
