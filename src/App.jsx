import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Homepage from "./pages/Home";
import SignIn from "./pages/SignIn";
import Permissions from "./pages/Permissions";
import DataManagement from "./pages/DataManagement";
import ModelTraining from "./pages/ModelTraining";
import ModelResult from "./pages/ModelResult";
import ModelManagement from "./pages/ModelManagement";
import Simulation from "./pages/Simulation";
function App() {
  const isLogin = sessionStorage.getItem("user");
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isLogin && <Route path="/" element={<SignIn />} />}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/data-management" element={<DataManagement />} />
            <Route path="model/:id" element={<ModelResult />} />
            <Route path="/model-training" element={<ModelTraining />} />
            <Route path="/model-management" element={<ModelManagement />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
