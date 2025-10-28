import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

function ProtectedRoute({  children, isLoggedIn}) {

  if (!isLoggedIn) { 
    return <Navigate to="/"  />;
  }

  return children;
}

export default ProtectedRoute;
