import VideoPlayerComponent from "./VideoPlayerComponent";

function RecordAnswerComponent() {
  return (
    <div className="rounded-3 overflow-hidden w-75 mx-auto fs-7">
      <VideoPlayerComponent />
      <div className="stream-question-container p-3">
        <span>¿Cual fue tu videojuego favorito durante tu infancia? </span>
      </div>
    </div>
  );
}

export default RecordAnswerComponent;
