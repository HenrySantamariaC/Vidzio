import "./AppPage.css";
import { useQuestionStore } from "../../store/questionStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecordAnswerComponent from "./components/RecordAnswerComponent";

function AppPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const listQuestions = useQuestionStore((state) => state.listQuestions);
  const currentIndex = useQuestionStore((state) => state.currentIndex);

  const handlePreviusButton = () => {
    let previusIndex = currentIndex;
    do {
      previusIndex =
        (previusIndex - 1 + listQuestions.length) % listQuestions.length;
    } while (listQuestions[previusIndex].isAnswered && previusIndex !== 0);
    navigate(`/app/video-question/${listQuestions[previusIndex].id}`);
  };
  const handleNextButton = () => {
    let nextIndex = currentIndex;

    do {
      nextIndex = (nextIndex + 1) % listQuestions.length;
    } while (listQuestions[nextIndex].isAnswered && nextIndex !== 0);

    navigate(`/app/video-question/${listQuestions[nextIndex].id}`);
  };

  return (
    <div className="w-75">
      <div className="mb-3">
        <Link to="/" className="btn-link cursor-pointer">{`< Volver`}</Link>
      </div>
      <div className="mb-3">
        <h6 className="fw-bold text-center">Pregunta {currentIndex + 1}</h6>
      </div>
      <RecordAnswerComponent uuid={uuid} />
      <div className="d-flex justify-content-between mt-3">
        <span
          className="btn-link rounded-3 py-2 px-3 cursor-pointer "
          onClick={handlePreviusButton}
        >{`Anterior`}</span>
        <span
          className="btn-link rounded-3 py-2 px-3 cursor-pointer "
          onClick={handleNextButton}
        >{`Siguiente`}</span>
      </div>
    </div>
  );
}

export default AppPage;
