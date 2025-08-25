import { useEffect, useState, useRef } from "react";
import FinalInvoice from "../components/FinalInvoice";
// import ImagesSlid from "../components/ImagesSlid";
// import VideosSlid from "../components/VideosSlid";
import { fetchAds } from "../services/AdsServices";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const interval = 100; // update every 100ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - interval;
        return next <= 0 ? 0 : next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Fetch carousel items from API
  useEffect(() => {
    setLoading(true);
    fetchAds()
      .then((e) => {
        setAds(e);
        setProgress(e.at(0)?.duration * 1000);
        setTotalTime(e.at(0)?.duration * 1000);

        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
    // centerPadding: "60px",
    arrows: false,
    className: "ads-slid",
    appendDots: (dots) => (
      <div
        style={{
          padding: "5px ",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    beforeChange: (_, next) => {
      setCurrentSlide(next);
    },

    afterChange: (current) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setProgress(ads[current]?.duration * 1000);
      setTotalTime(ads[current]?.duration * 1000);

      if (isPlaying && ads[current]?.duration) {
        timeoutRef.current = setTimeout(() => {
          sliderRef.current.slickNext();
        }, ads[current].duration * 1000);
      }
    },
  };

  // Initialize autoplay when items change or slide changes
  useEffect(() => {
    if (isPlaying && ads.length > 0 && ads[currentSlide]?.duration) {
      timeoutRef.current = setTimeout(() => {
        sliderRef.current.slickNext();
      }, ads[currentSlide].duration * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentSlide, isPlaying, ads]);

  // The Design may chanage
  return (
    <>
      <div
        className="custmer-screen"
        style={{
          backgroundColor: "#eee",
          padding: "16px",
        }}
      >
        <div
          className="custmer-invoice"
          style={{ borderRadius: "8px", padding: "8px" }}
        >
          <h3 style={{ textWrap: "balance" }}>Thank You For Shoping With Us</h3>
          <FinalInvoice invoice={currentInvoice} />
        </div>
        <div className="ads-section">
          {ads.length === 1 ? (
            <div className="singal-slide">
              {ads[0].mediaUrl.slice(-3) !== "mp4" ? (
                <img
                  src={`http://localhost:8080${ads[0].mediaUrl}`}
                  alt={ads[0].name}
                  height="calc(100vh - 32px - 150px)"
                />
              ) : (
                <video
                  src={`http://localhost:8080${ads[0].mediaUrl}`}
                  autoPlay
                  muted
                  loop
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          ) : (
            <Slider
              ref={sliderRef}
              {...settings}
              style={{ backgroundColor: "white" }}
            >
              {ads.map((item, index) => (
                <div key={item.id || index}>
                  {item.mediaUrl.slice(-3) !== "mp4" ? (
                    <img
                      src={`http://localhost:8080${item.mediaUrl}`}
                      alt={item.name}
                      height="calc(100vh - 32px - 150px)"
                    />
                  ) : (
                    <video
                      src={`http://localhost:8080${item.mediaUrl}`}
                      autoPlay
                      muted
                      loop
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </div>
              ))}
            </Slider>
          )}

          <div
            style={{
              height: "100%",
              borderRadius: "8px",
              backgroundColor: "white",
              padding: "8px",
              marginTop: "10px",
              textAlign: "start",
              direction: "rtl",
              overflow: "auto",
            }}
          >
            <p
              style={{
                padding: "0.5rem 1rem",
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
                // fontSize: "0.875rem",
                lineHeight: "1.25rem",
                color: "#1E40AF",
                backgroundColor: " #BFDBFE",
              }}
            >
              بيض
            </p>
            <p
              style={{
                padding: "0.5rem 1rem",
                marginBottom: "1rem",
                borderRadius: "0.5rem",
                // fontSize: "0.875rem",
                lineHeight: "1.25rem",
                color: "#1E40AF",
                backgroundColor: " #BFDBFE",
              }}
            >
              سكر
            </p>
            {/* <h4
              style={{ textAlign: "start", direction: "rtl", fontSize: "19px" }}
            >
              هل تريد شراء:
            </h4>
            <span> حليب</span> */}
          </div>
        </div>
      </div>
      {/* Loading for ads duration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${100 - (progress * 100) / 1000 / (totalTime / 1000)}%`,
            backgroundColor: "var(--primaryColor)", // YouTube-style red
            transition: "width 0.1s linear",
            position: "relative",
          }}
        >
          {/* Optional: Add a "buffer" effect */}
          {/* <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                transform: `scaleX(${
                  (progress * 100) / 1000 / (totalTime / 1000)
                })`,
                transformOrigin: "left center",
              }}
            /> */}
        </div>
      </div>
    </>
  );
}
