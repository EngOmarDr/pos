import { useEffect, useState , useRef} from "react";
import FinalInvoice from "../components/FinalInvoice";

export default function CustmerScreen() {
  const [currentInvoice, setCurrentInvoice] = useState([]);
  const channelRef = useRef();
  if (!channelRef.current) {
    channelRef.current = new BroadcastChannel("pos-channel");
  }
  useEffect(() => {
    channelRef.current.onmessage = (event) => {
      setCurrentInvoice(event.data.invoice);
      console.log("INSIDE?!");
    };
    return () => channelRef.current.close();
  }, []);
  // The Design may chanage
  return <FinalInvoice invoice={currentInvoice} isCustmerScreen={true} />;
}
