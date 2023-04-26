import HomePage from "./pages/Home/HomePage";
import SideBarComponent from "./components/SideBarComponent";
import AppPage from "./pages/App/AppPage";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container p-4">
      <HashRouter>
        <SideBarComponent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/app/video-question/:uuid" element={<AppPage />} />
            <Route path="/about" element={<HomePage />} />
          </Routes>
        </SideBarComponent>
      </HashRouter>
    </div>
  );
}

export default App;
