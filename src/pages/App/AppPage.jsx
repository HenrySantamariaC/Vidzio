import RecordAnswerComponent from "./components/RecordAnswerComponent";
import "./AppPage.css";

function AppPage() {
  return (
    <>
      <div>
        <span className="btn-back rounded-3 py-2 px-3 cursor-pointer ">{`< Volver`}</span>
      </div>
      <RecordAnswerComponent />
    </>
  );
}

export default AppPage;
