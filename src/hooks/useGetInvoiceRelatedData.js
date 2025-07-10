import { useEffect, useState } from "react";
import {
  fetchCurrencyValue,
  fetchInvoiceTypeData,
} from "../services/InvoiceServices";
import { getLocalISODateTime } from "../utilities/getLocalISODateTime";

export default function useGetInvoiceRelatedData() {
  const [invoiceRelatedData, setInvoiceRelatedData] = useState({
    warehouseId: JSON.parse(localStorage.getItem("loginInfo")).warehouseId,
  });
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      setIsFetching(true);
      try {
        const invoiceTypeData = await fetchInvoiceTypeData();
        const currencyValue = await fetchCurrencyValue(
          invoiceTypeData.defaultCurrencyId
        );
        setInvoiceRelatedData((prevState) => ({
          ...prevState,
          invoiceTypeId: invoiceTypeData.type,
          date: getLocalISODateTime(),
          accountId: invoiceTypeData.defaultCashAccId,
          currencyId: invoiceTypeData.defaultCurrencyId,
          currencyValue: currencyValue.currencyValue,
          payType: invoiceTypeData.isCashBill ? 0 : 1,
        }));
        setIsFetching(false);
      } catch (responceError) {
        setError({
          message: responceError.response.data.message || "Faild To Fetch Data",
        });
        setIsFetching(false);
      }
    }
    getData();
  }, []);

  return {
    invoiceRelatedData,
    isFetching,
    error,
  };
}
