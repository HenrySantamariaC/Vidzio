import WebRtcClass from "./../../../utils/WebRtcClass.js";
import { useEffect, useRef, useState } from "react";
import ControlsVideoPlayerComponent from "./ControlsVideoPlayerComponent";

function VideoPlayerComponent({ urlObject, updateUrlAnswer }) {
  const recordingStates = {
    beforeRecording: 0,
    recording: 1,
    endRecording: 2,
    playing: 3,
  };

  const [recordingState, setRecordingState] = useState(
    recordingStates.beforeRecording
  );
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const videoContainer = useRef();

  const handleStartRecording = async () => {
    videoContainer.current.autoplay = true;
    videoContainer.current.muted = true;
    await loadMediaDevices();
    WebRtcClass.startRecording();
    setRecordingState(recordingStates.recording);
    console.log("¡Haz hecho clic en el botón! start");
  };
  const handleStopRecording = () => {
    setTimeInSeconds(0);
    setRecordingState(recordingStates.endRecording);
    WebRtcClass.stopRecording();
    console.log("¡Haz hecho clic en el botón! stop");
  };
  const handleLoadVideo = () => {
    videoContainer.current.srcObject = null;
    videoContainer.current.autoplay = false;
    videoContainer.current.muted = false;
    videoContainer.current.src = WebRtcClass.playingVideo();
    updateUrlAnswer(videoContainer.current.src);
  };
  const handlePlayVideo = () => {
    videoContainer.current.play();
  };

  const intervalCounterTime = () => {
    let interval = null;
    if (recordingState === recordingStates.recording && timeInSeconds <= 120) {
      interval = setInterval(() => {
        setTimeInSeconds((time) => time + 1);
      }, 1000);
      return interval;
    }
    if (recordingState === recordingStates.recording) {
      clearInterval(interval);
      handleStopRecording();
    }
    return interval;
  };
  const loadMediaDevices = async () => {
    videoContainer.current.srcObject = await WebRtcClass.getMediaDevices();
  };

  useEffect(() => {
    if (urlObject !== "") {
      videoContainer.current.src = urlObject;
      setRecordingState(recordingStates.playing);
    } else {
      videoContainer.current.src = "";
      setRecordingState(recordingStates.beforeRecording);
    }
  }, [urlObject]);
  useEffect(() => {
    const timer = intervalCounterTime();
    return () => {
      clearInterval(timer);
    };
  }, [recordingState]);

  return (
    <>
      <div className="stream-video-container bg-black position-relative">
        <div className="position-absolute w-100 h-100">
          <video
            autoPlay
            playsInline
            muted
            className=" h-100 w-100"
            id="video-example"
            ref={videoContainer}
          ></video>
        </div>
        <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between">
          <ControlsVideoPlayerComponent
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            handlePlayVideo={handlePlayVideo}
            handleLoadVideo={handleLoadVideo}
            recordingState={recordingState}
            time={timeInSeconds}
          />
        </div>
      </div>
    </>
  );
}

export default VideoPlayerComponent;
