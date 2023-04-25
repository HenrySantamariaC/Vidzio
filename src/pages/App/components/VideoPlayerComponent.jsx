import CircleRecIcon from "./../../../assets/icons/circle-rec.svg";
import PlayIcon from "./../../../assets/icons/play.svg";
import WebRtcClass from "./../../../utils/WebRtcClass.js";
import { formatingTime } from "./../../../utils/utilities.js";
import { useEffect, useRef, useState } from "react";
import ControlsVideoPlayerComponent from "./ControlsVideoPlayerComponent";

function VideoPlayerComponent() {
  const recordingStates = {
    beforeRecording: 0,
    recording: 1,
    endRecording: 2,
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
  const handlePlayVideo = () => {
    videoContainer.current.srcObject = null;
    videoContainer.current.src = WebRtcClass.playingVideo();
    videoContainer.current.autoplay = false;
    videoContainer.current.muted = false;
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
          <div className="d-flex justify-content-end align-items-center p-2 gap-1">
            {recordingState === recordingStates.recording ? (
              <>
                <div>
                  <span>{formatingTime(timeInSeconds)} / 2:00</span>
                  <img
                    className="recording-start"
                    src={CircleRecIcon}
                    width="20px"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {recordingState === recordingStates.endRecording ? (
              <>
                <div
                  className="bg-main p-1 rounded-3 cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <img src={PlayIcon} alt="play icon" width="16px" />
                  <span>Play video</span>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="d-flex justify-content-center p-2">
            <ControlsVideoPlayerComponent
              handleStartRecording={handleStartRecording}
              handleStopRecording={handleStopRecording}
              recordingState={recordingState}
              time={timeInSeconds}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPlayerComponent;
