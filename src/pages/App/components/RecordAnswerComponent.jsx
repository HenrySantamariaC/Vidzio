import { useEffect } from "react";
import { useQuestionStore } from "../../../store/questionStore";
import VideoPlayerComponent from "./VideoPlayerComponent";

function RecordAnswerComponent({ uuid }) {
  const listQuestions = useQuestionStore((state) => state.listQuestions);
  const currentIndex = useQuestionStore((state) => state.currentIndex);
  const getIndexQuestionById = useQuestionStore(
    (state) => state.getIndexQuestionById
  );
  const addAnswerQuestion = useQuestionStore(
    (state) => state.addAnswerQuestion
  );

  const updateUrlAnswer = (urlObject) => {
    addAnswerQuestion(listQuestions[currentIndex].id, urlObject);
  };

  useEffect(() => {
    getIndexQuestionById(uuid);
  }, [uuid]);

  return (
    <>
      <div className="rounded-3 overflow-hidden fs-7">
        <VideoPlayerComponent
          urlObject={listQuestions[currentIndex].urlObject}
          updateUrlAnswer={updateUrlAnswer}
        />
        <div className="stream-question-container p-3">
          <span>{listQuestions[currentIndex].text}</span>
        </div>
      </div>
    </>
  );
}

export default RecordAnswerComponent;
