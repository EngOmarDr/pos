export function getLeafNodes(nodes) {
  let result = [];
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      result = result.concat(getLeafNodes(node.children));
    } else {
      result.push(node);
    }
  }
  return result;
}
