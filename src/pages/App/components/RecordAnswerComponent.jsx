import { useEffect } from "react";
import VideoPlayerComponent from "./VideoPlayerComponent";

function RecordAnswerComponent({ data }) {
  return (
    <>
      <div className="rounded-3 overflow-hidden fs-7">
        <VideoPlayerComponent urlObject={data.urlObject} />
        <div className="stream-question-container p-3">
          <span>{data.text}</span>
        </div>
      </div>
    </>
  );
}

export default RecordAnswerComponent;
