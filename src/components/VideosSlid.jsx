import { useState } from "react";
import { MEDIA } from "../utilities/dump.js";

export default function VideosSlid() {
  const [cuurentVideo, setCurrentVideo] = useState(0);
  function handleEndVideo() {
    setCurrentVideo((prev) => (prev + 1) % MEDIA.length);
  }
  return (
    <div className="videos-slid">
      <video
        src={MEDIA[cuurentVideo].video}
        autoPlay
        muted
        playsInline
        controls={false}
        onEnded={handleEndVideo}
      >
        YOUR BROWSER DOS NOT SUPPORT VIDEOS
      </video>
    </div>
  );
}
