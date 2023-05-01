import { useEffect, useRef, useState } from "react";
import { formatingTime } from "@/utils/utilities";
import { recordingStates } from "@/config/config";
import useVideoTimer from "@/hooks/useVideoTimer";
import RecordingIcon from "@/assets/icons/recording.svg";
import CircleRecIcon from "@/assets/icons/circle-rec.svg";
import StopIcon from "@/assets/icons/stop-recording.svg";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import RepeatIcon from "@/assets/icons/repeat.svg";

function ControlsVideoPlayerComponent({
  handleStartRecording,
  handleStopRecording,
  handlePlayVideo,
  existPrevVideo,
}) {
  const progressTimer = useRef();
  const { time, start, stop } = useVideoTimer();
  const [isPlaying, setIsPlaying] = useState(true);
  const [recordingState, setRecordingState] = useState(
    recordingStates.beforeRecording
  );

  const handleRecording = () => {
    setRecordingState(recordingStates.recording);
    handleStartRecording();
    start();
  };
  const handleStopping = () => {
    setRecordingState(recordingStates.endRecording);
    stop();
    handleStopRecording();
  };
  const handlePlaying = () => {
    setIsPlaying(!isPlaying);
    handlePlayVideo(isPlaying);
  };

  useEffect(() => {
    existPrevVideo
      ? setRecordingState(recordingStates.endRecording)
      : setRecordingState(recordingStates.beforeRecording);
  }, [existPrevVideo]);
  useEffect(() => {
    if (time > 120) handleStopping();
    progressTimer.current.style.background = `conic-gradient(
      var(--color-active) ${time * 3}deg,
      var(--color-white) 0deg
    )`;
  }, [time]);

  return (
    <>
      <div className="d-flex justify-content-end align-items-center p-2 gap-1">
        {recordingState === recordingStates.recording ? (
          <>
            <div>
              <span>{formatingTime(time)} / 2:00</span>
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
              onClick={handlePlaying}
            >
              <img
                src={isPlaying ? PlayIcon : PauseIcon}
                alt="play icon"
                width="16px"
              />
              <span>{isPlaying ? "Play" : "Pause"}</span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex justify-content-center p-2">
        <div
          className="controls-container rounded-circle p-2 cursor-pointer"
          id="btn-container"
        >
          <img
            src={RecordingIcon}
            alt="stop icon"
            className={
              recordingState == recordingStates.beforeRecording ? "" : "d-none"
            }
            width="30px"
            onClick={handleRecording}
          />
          <div
            className={`circular-progress ${
              recordingState == recordingStates.recording ? "" : "d-none"
            }`}
            ref={progressTimer}
            onClick={handleStopping}
          >
            <img
              src={StopIcon}
              alt="stop icon"
              className="position-absolute"
              width="90%"
            />
          </div>
          <img
            src={RepeatIcon}
            alt="stop icon"
            height="30px"
            className={
              recordingState == recordingStates.endRecording ||
              recordingState == recordingStates.playing
                ? ""
                : "d-none"
            }
            onClick={handleRecording}
          />
        </div>
      </div>
    </>
  );
}

export default ControlsVideoPlayerComponent;
