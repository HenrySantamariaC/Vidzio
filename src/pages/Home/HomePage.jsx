import QuestionCardComponent from "./components/QuestionCardComponent";
import { useQuestionStore } from "./../../store/questionStore";
import { Link } from "react-router-dom";

function HomePage() {
  const questions = useQuestionStore((state) => state.listQuestions);

  return (
    <div className="text-white">
      <div className="row g-2">
        {questions.map((question) => (
          <Link
            to={`/app/video-question/${question.id}`}
            className="col-3 d-flex justify-content-center"
            key={question.id}
          >
            <QuestionCardComponent
              textQuestion={question.text}
              urlQuestion={question.urlObject}
              urlThumbnail={question.urlThumbnail}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
