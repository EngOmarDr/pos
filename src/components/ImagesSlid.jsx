import { useEffect, useState } from "react";
import { ADS } from "../utilities/dump.js";
export default function ImagesSlid() {
  const [cuurentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % ADS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="ads-slid">
      <img src={ADS[cuurentImage].image} alt="iamge" />
    </div>
  );
}
