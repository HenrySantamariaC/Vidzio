import RecordingIcon from "./../../../assets/icons/recording.svg";
import StopIcon from "./../../../assets/icons/stop-recording.svg";
import RepeatIcon from "./../../../assets/icons/repeat.svg";
import { useEffect, useRef, useState } from "react";

function ControlsVideoPlayerComponent({
  handleStartRecording,
  handleStopRecording,
  recordingState,
  time,
}) {
  const recordingStates = {
    beforeRecording: 0,
    recording: 1,
    afterRecording: 2,
  };

  const progressTimer = useRef();

  useEffect(() => {
    progressTimer.current.style.background = `conic-gradient(
      var(--color-active) ${time * 3}deg,
      var(--color-white) 0deg
    )`;
  }, [time]);

  return (
    <>
      <div
        className="controls-container d-flex gap-2 rounded-circle p-2 cursor-pointer"
        id="btn-container"
      >
        <img
          src={RecordingIcon}
          alt="stop icon"
          className={
            recordingState == recordingStates.beforeRecording ? "" : "d-none"
          }
          width="30px"
          onClick={handleStartRecording}
        />
        <div
          className={`circular-progress ${
            recordingState == recordingStates.recording ? "" : "d-none"
          }`}
          ref={progressTimer}
          onClick={handleStopRecording}
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
            recordingState == recordingStates.afterRecording ? "" : "d-none"
          }
          onClick={handleStartRecording}
        />
      </div>
    </>
  );
}

export default ControlsVideoPlayerComponent;
