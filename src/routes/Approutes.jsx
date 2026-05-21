import { Routes, Route } from "react-router-dom";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Dashboard from "../pages/Dashboard";
import TeacherProfile from "../pages/TeacherProfile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/teacher-profile"
        element={<TeacherProfile />}
      />
    </Routes>
  );
}

export default AppRoutes;