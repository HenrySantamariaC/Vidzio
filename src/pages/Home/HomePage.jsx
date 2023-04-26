import React, { useEffect } from "react";
import QuestionCardComponent from "./components/QuestionCardComponent";
import { useQuestionStore } from "./../../store/questionStore";
import { Link } from "react-router-dom";

function HomePage() {
  const questions = useQuestionStore((state) => state.listQuestions);
  const getQuestionsList = useQuestionStore((state) => state.getQuestionsList);

  useEffect(() => {
    getQuestionsList();
  }, []);

  return (
    <div className="text-white">
      <div className="row g-2">
        {questions.map((question) => (
          <Link
            to={`/app/video-question/${question.id}`}
            className="col-3 d-flex justify-content-center"
            key={question.id}
          >
            <QuestionCardComponent textQuestion={question.text} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
