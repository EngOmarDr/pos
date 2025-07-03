import axiosInstance from "../utilities/api";

export async function fetchGroupsTree() {
  const response = await axiosInstance.get("/groups/tree");
  return response.data;
}
