import React, { useEffect, useRef, useState } from "react";
import "./../Home.css";
import IconPlay from "./../../../assets/icons/play_circle.svg";
import videoExample from "./../../../assets/video/sea.webm";

function QuestionComponent({ textQuestion, urlQuestion, urlThumbnail }) {
  const cardContainer = useRef();
  const videoSource = useRef();

  const handlePlayVideo = (stateVideo) => {
    stateVideo ? videoSource.current.play() : videoSource.current.pause();
  };

  return (
    <>
      <div
        className="card bg-dark question-card rounded-4 overflow-hidden"
        onMouseEnter={() => handlePlayVideo(true)}
        onMouseLeave={() => handlePlayVideo(false)}
        ref={cardContainer}
      >
        <div className="video-container">
          <div className="h-100 position-relative d-flex align-items-end">
            <video
              muted
              loop
              className="bg-black position-absolute h-100 w-100"
              id="video-example"
              poster={urlThumbnail}
              ref={videoSource}
            >
              <source
                src={urlQuestion !== "" ? urlQuestion : videoExample}
                type="video/webm"
              />
            </video>
            <div className="shadow-video position-absolute h-100 w-100"></div>
            <div className="position-absolute">
              <img src={IconPlay} alt="icon-playvideo" className=" m-2" />
              <div className="question-text px-2 py-3 text-white">
                <h6 className="fs-7">{textQuestion}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionComponent;
