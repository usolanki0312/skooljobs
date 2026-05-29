import { Routes, Route } from "react-router-dom";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Dashboard from "../pages/teacher/Dashboard";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import SchoolDashboard from "../pages/school/SchoolDashboard";
import SchoolProfile from "../pages/school/SchoolProfile";
import SelectRole from "../pages/SelectRole";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teacher-profile" element={<TeacherProfile />} />
      <Route path="/school-dashboard" element={<SchoolDashboard />} />
      <Route path="/school-profile" element={<SchoolProfile />} />
      <Route path="/select-role" element={<SelectRole />} />
    </Routes>
  );
}

export default AppRoutes;
