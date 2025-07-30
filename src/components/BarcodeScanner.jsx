import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { getAllByBarcode } from "../services/PoductsServices";

export default function BarcodeScanner({ onQRScan }) {
  useSymbologyScanner((decoded) => {
    async function getProduct(code) {
      const response = await getAllByBarcode(code);
      onQRScan(response,code);
    }
    getProduct(decoded);
  });
  return null;
}
