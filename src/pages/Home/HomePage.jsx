import React from "react";
import QuestionCardComponent from "./components/QuestionCardComponent";

function HomePage() {
  return (
    <div className="text-white">
      <div className="row g-2">
        <div className="col-3 d-flex justify-content-center">
          <QuestionCardComponent />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
