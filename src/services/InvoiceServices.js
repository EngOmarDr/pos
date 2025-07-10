import axiosInstance from "../utilities/api";

export async function fetchInvoiceTypeData() {
  // FOR NOW IT WILL BE STATIC 1
  const response = await axiosInstance.get("/invoice-types/4");
  return response.data;
}
export async function fetchCurrencyValue(id) {
  const response = await axiosInstance.get(`/currencies/${id}`);
  return response.data;
}
export async function creatInvoice(invoice) {
  console.log(invoice);

  const response = await axiosInstance.post("/invoices", invoice);
  return response.data;
}
