import axiosInstance from "../utilities/api";

export async function fetchAds() {
  const response = await axiosInstance.get("/advertisements");
  return response.data;
}