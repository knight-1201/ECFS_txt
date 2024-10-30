import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = sessionStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;
