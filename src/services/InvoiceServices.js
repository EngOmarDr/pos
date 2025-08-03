import axiosInstance from "../utilities/api";

export async function fetchInvoiceTypeData() {
  // FOR NOW IT WILL BE STATIC 1
  const res = await axiosInstance.get("/invoice-pos");
  console.log('from invoice services -> fetch invoice typeData');
  console.log(res.data);
  const response = await axiosInstance.get(`/invoice-types/${res.data.at(0).invoiceTypeId}`);
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
export async function deleteInvoice(id) {
  const response = await axiosInstance.delete(`/invoices/${id}`);
  return response.data;
}
export async function updateInvoice(id, invoice) {
  const response = await axiosInstance.put(`/invoices/${id}`, invoice);
  return response.data;
}
export async function fetchAllInvoices() {
  const response = await axiosInstance.get("/invoices");
  const responseData = response.data;
  const updatedResponse = responseData.map((invoice) => {
    const updatedInvoiceItems = invoice.invoiceItems.map((item) => {
      const { qty, productName, ...rest } = item;
      return { ...rest, quantity: qty, name: productName };
    });
    return { ...invoice, invoiceItems: updatedInvoiceItems };
  });
  return updatedResponse;
}
