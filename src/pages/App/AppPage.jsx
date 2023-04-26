import "./AppPage.css";
import RecordAnswerComponent from "./components/RecordAnswerComponent";
import { useQuestionStore } from "./../../store/questionStore";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AppPage() {
  const { uuid } = useParams();
  const { getQuestionsList, getQuestionById } = useQuestionStore();
  const question = useQuestionStore((state) => state.current);

  useEffect(() => {
    getQuestionsList();
    getQuestionById(uuid);
  }, []);

  return (
    <div className="w-75">
      <div className="mb-3">
        <Link to="/" className="btn-link cursor-pointer">{`< Volver`}</Link>
      </div>
      <RecordAnswerComponent data={question} />
      <div className="d-flex justify-content-between mt-3">
        <span className="btn-link rounded-3 py-2 px-3 cursor-pointer ">{`Anterior`}</span>
        <span className="btn-link rounded-3 py-2 px-3 cursor-pointer ">{`Siguiente`}</span>
      </div>
    </div>
  );
}

export default AppPage;
