import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BudgetsPage from "../pages/BudgetsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/presupostos" element={<BudgetsPage />} />
      </Routes>
    </>
  );
};

export default App;
