import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/login";
import Dashboard from "./pages/Dashboard";
import InvitePage from "./pages/InvitePage";
import RegisterPage from "./pages/auth/register";
import "./App.css";

import { useContext } from "react";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

const AppRoutes = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const loading = authContext?.loading;
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <RegisterPage />}
      />
      <Route path="/invite/:inviteId" element={<InvitePage />} />
      {/* <Route
        path="/board/:id/:title"
        element={user ? <BoardDetail /> : <Navigate to="/login" />}
      /> */}
    </Routes>
  );
};

export default App;
