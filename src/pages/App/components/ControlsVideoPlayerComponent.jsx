import RecordingIcon from "./../../../assets/icons/recording.svg";
import CircleRecIcon from "./../../../assets/icons/circle-rec.svg";
import StopIcon from "./../../../assets/icons/stop-recording.svg";
import PlayIcon from "./../../../assets/icons/play.svg";
import SaveIcon from "./../../../assets/icons/save-video.svg";
import RepeatIcon from "./../../../assets/icons/repeat.svg";
import { useEffect, useRef } from "react";
import { formatingTime } from "../../../utils/utilities";

function ControlsVideoPlayerComponent({
  handleStartRecording,
  handleStopRecording,
  handleLoadVideo,
  handlePlayVideo,
  recordingState,
  time,
}) {
  const recordingStates = {
    beforeRecording: 0,
    recording: 1,
    endRecording: 2,
    playing: 3,
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
              onClick={handleLoadVideo}
            >
              <img src={SaveIcon} alt="play icon" width="16px" />
              <span> Save</span>
            </div>
          </>
        ) : (
          <></>
        )}
        {recordingState === recordingStates.playing ? (
          <>
            <div
              className="bg-main p-1 rounded-3 cursor-pointer"
              onClick={handlePlayVideo}
            >
              <img src={PlayIcon} alt="play icon" width="16px" />
              <span>Play</span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex justify-content-center p-2">
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
              recordingState == recordingStates.endRecording ||
              recordingState == recordingStates.playing
                ? ""
                : "d-none"
            }
            onClick={handleStartRecording}
          />
        </div>
      </div>
    </>
  );
}

export default ControlsVideoPlayerComponent;
