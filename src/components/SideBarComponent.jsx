import "./components.css";
import Logo from "./../assets/icons/VidzioLogo.svg";
import HomeIcon from "./../assets/icons/Home.svg";
import SettingsIcon from "./../assets/icons/Settings.svg";
import InfoIcon from "./../assets/icons/info.svg";
import { NavLink } from "react-router-dom";
import { useQuestionStore } from "../store/questionStore";
import { useEffect } from "react";

function SideBarComponent({ children }) {
  const loadQuestionsList = useQuestionStore(
    (state) => state.loadQuestionsList
  );

  useEffect(() => {
    loadQuestionsList();
  }, []);
  return (
    <div className="row text-white">
      <div className="row">
        <div className="col-3 col-lg-2">
          <div className="logo">
            <img src={Logo} alt="Vidzio logo" />
          </div>
        </div>
        <div className="col d-flex align-items-center">
          <h4 className="fw-bold">Video Cuestionario</h4>
        </div>
      </div>
      <div className="col-3 col-lg-2 ">
        <ul className="menu-list d-flex flex-column gap-4 p-2">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <li>
              <img src={HomeIcon} alt="home-icon" width={20} />
              <span className="ps-1">Home</span>
            </li>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <li>
              <img src={InfoIcon} alt="home-icon" width={20} />
              <span className="ps-1">About</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="col ">{children}</div>
    </div>
  );
}

export default SideBarComponent;
