import { useEffect, useRef, useState } from "react";
import { wait, generateMiniatureUrl } from "@/utils/utilities";
import WebRtcClass from "@/utils/WebRtcClass.js";
import ControlsVideoPlayerComponent from "./ControlsVideoPlayerComponent";
import { useQuestionStore } from "@/store/questionStore";

function VideoPlayerComponent({ urlObject, updateUrlAnswer }) {
  const [existPrevVideo, setExistPrevVideo] = useState(false);
  const videoHtml = useRef();

  // Handle functions
  const handleStartRecording = async () => {
    setVideoElement(await WebRtcClass.getMediaDevices(), true);
    WebRtcClass.startRecording();
    console.log("¡Haz hecho clic en el botón! start");
  };
  const handleStopRecording = async () => {
    setVideoElement(null, false);
    WebRtcClass.stopRecording();
    await loadVideoUrl();
    console.log("¡Haz hecho clic en el botón! stop");
  };
  const handlePlayVideo = (isPlaying) => {
    isPlaying ? videoHtml.current.play() : videoHtml.current.pause();
  };

  // Other functions
  const loadVideoUrl = async () => {
    await wait(1);
    videoHtml.current.src = await WebRtcClass.getUrlVideo();
    let urlThumbnail = await generateMiniatureUrl(videoHtml.current);
    updateUrlAnswer({
      urlObject: videoHtml.current.src,
      urlThumbnail: urlThumbnail,
    });
  };
  const setVideoElement = (srcObject, isRecording) => {
    videoHtml.current.autoplay = isRecording;
    videoHtml.current.muted = isRecording;
    videoHtml.current.srcObject = srcObject;
  };

  // useEffect Hooks
  useEffect(() => {
    videoHtml.current.src = urlObject;
    urlObject !== "" ? setExistPrevVideo(true) : setExistPrevVideo(false);
  }, [urlObject]);

  return (
    <>
      <div className="stream-video-container bg-black position-relative">
        <div className="position-absolute w-100 h-100">
          <video
            playsInline
            className=" h-100 w-100"
            id="video-example"
            ref={videoHtml}
          ></video>
        </div>
        <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between">
          <ControlsVideoPlayerComponent
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            handlePlayVideo={handlePlayVideo}
            existPrevVideo={existPrevVideo}
          />
        </div>
      </div>
    </>
  );
}

export default VideoPlayerComponent;
