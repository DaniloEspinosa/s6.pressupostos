import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PresupostosPage from "../features/pressupostos/pages/PresupostosPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/presupostos" element={<PresupostosPage />} />
    </Routes>
  );
};

export default App;
