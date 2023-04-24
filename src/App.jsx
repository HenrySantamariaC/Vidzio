import HomePage from "./pages/Home/HomePage";
import SideBarComponent from "./components/SideBarComponent";
import AppPage from "./pages/App/AppPage";

function App() {
  return (
    <div className="container p-4">
      <SideBarComponent>
        <AppPage />
      </SideBarComponent>
    </div>
  );
}

export default App;
