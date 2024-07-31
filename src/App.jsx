import { Route, Routes } from "react-router-dom";
import MainPage from "./views/MainPage";
import Docentes from "./views/Docentes";
import Practicas from "./views/Practicas";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/teachers" element={<Docentes />} />
        <Route path="/practices" element={<Practicas />} />
        <Route path="*" element={<h1>Error 404: Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
