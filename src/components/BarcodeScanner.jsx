import { useSymbologyScanner } from "@use-symbology-scanner/react";

export default function BarcodeScanner({ onQRScan, allProdcuts }) {
  useSymbologyScanner((decoded) => {
    const product = allProdcuts.find((product) => {
      return product.barcodes[0].barcode == decoded;
    });
    onQRScan(product);
  });
  return null;
}
