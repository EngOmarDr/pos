import { useEffect, useState, useRef } from "react";
import FinalInvoice from "../components/FinalInvoice";
import ImagesSlid from "../components/ImagesSlid";
import VideosSlid from "../components/VideosSlid";

export default function CustmerScreen() {
  const [currentInvoice, setCurrentInvoice] = useState([]);
  const channelRef = useRef();
  if (!channelRef.current) {
    channelRef.current = new BroadcastChannel("pos-channel");
  }
  useEffect(() => {
    channelRef.current.onmessage = (event) => {
      setCurrentInvoice(event.data.invoice);
    };
    return () => channelRef.current.close();
  }, []);
  // The Design may chanage
  return (
    <div className="custmer-screen">
      <div className="custmer-invoice">
        <h3>Thank You For Shoping With Us</h3>
        <FinalInvoice invoice={currentInvoice} />
      </div>
      <div className="ads-section">
        <ImagesSlid />
        <VideosSlid />
      </div>
    </div>
  );
}
