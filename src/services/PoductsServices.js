import axiosInstance from "../utilities/api";

export async function fetchProducts() {
  const response = await axiosInstance.get("/products");
  return response.data;
}
export async function getAllByBarcode(QR) {
  const response = await axiosInstance.get(
    `/products/by-barcode?barcode=${QR}`
  );
  return response.data;
}
export async function getById(id) {
  const response = await axiosInstance.get(`/products/${id}`);
  console.log(response.data);
  return response.data;
}
