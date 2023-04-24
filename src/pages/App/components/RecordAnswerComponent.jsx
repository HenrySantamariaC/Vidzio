import CircleRecIcon from "./../../../assets/icons/circle-rec.svg";
import RecordingIcon from "./../../../assets/icons/recording.svg";
import StopIcon from "./../../../assets/icons/stop-recording.svg";
import RepeatIcon from "./../../../assets/icons/repeat.svg";
import PlayIcon from "./../../../assets/icons/play.svg";
import videoExample from "./../../../assets/video/lluvia.webm";
import { useEffect, useRef, useState } from "react";

function RecordAnswerComponent() {
  const recordingSteps = {
    noVideo: 0,
    recording: 1,
    stopVideo: 2,
  };

  const [stateValues, setStateValues] = useState(recordingSteps.noVideo);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const progressTimer = useRef();

  const handleStartRecording = () => {
    setStateValues(recordingSteps.recording);
  };
  const handleStopRecording = () => {
    setStateValues(recordingSteps.stopVideo);
  };
  const handleReRecord = () => {
    setStateValues(recordingSteps.recording);
  };

  const intervalCounterTime = () => {
    let interval = null;
    if (stateValues === recordingSteps.recording && timeInSeconds <= 120) {
      progressTimer.current.style.background = `conic-gradient(
        var(--color-active) ${timeInSeconds * 3}deg,
        var(--color-white) 0deg
      )`;
      interval = setInterval(() => {
        setTimeInSeconds((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimeInSeconds(0);
      stateValues !== recordingSteps.noVideo
        ? setStateValues(recordingSteps.stopVideo)
        : "";
    }
    return interval;
  };

  useEffect(() => {
    const timer = intervalCounterTime();
    return () => {
      clearInterval(timer);
    };
  }, [stateValues, timeInSeconds]);

  return (
    <div className="rounded-3 overflow-hidden w-50 fs-7">
      <div className="stream-video-container bg-black position-relative">
        <div className="position-absolute w-100 h-100">
          <video muted loop className=" h-100 w-100" id="video-example">
            <source src={videoExample} type="video/webm" />
          </video>
        </div>
        <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-end align-items-center p-2 gap-1">
            <div
              className={`bg-main p-1 rounded-3 ${
                stateValues == recordingSteps.stopVideo ? "" : "d-none"
              }`}
            >
              <img src={PlayIcon} alt="play icon" width="16px" />
              <span>Play video</span>
            </div>

            <div
              className={
                stateValues == recordingSteps.recording ? "" : "d-none"
              }
            >
              <span>
                {`${parseInt(timeInSeconds / 60)}:${timeInSeconds % 60}`} / 2:00
              </span>
              <img
                className="recording-start"
                src={CircleRecIcon}
                width="20px"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center p-2">
            <div className="controls-container d-flex gap-2 rounded-circle p-2">
              <img
                src={RecordingIcon}
                alt="stop icon"
                className={
                  stateValues == recordingSteps.noVideo ? "" : "d-none"
                }
                width="30px"
                onClick={handleStartRecording}
              />
              <div
                className={`circular-progress ${
                  stateValues == recordingSteps.recording ? "" : "d-none"
                }`}
                onClick={handleStopRecording}
                ref={progressTimer}
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
                  stateValues == recordingSteps.stopVideo ? "" : "d-none"
                }
                onClick={handleReRecord}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="stream-question-container p-3">
        <span>¿Cual fue tu videojuego favorito durante tu infancia? </span>
        <span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
          amet illum facere, accusamus dignissimos tenetur, temporibus ratione
          similique impedit odio beatae velit cum quisquam! Nisi distinctio
          molestias suscipit sint doloribus?
        </span>
      </div>
    </div>
  );
}

export default RecordAnswerComponent;
