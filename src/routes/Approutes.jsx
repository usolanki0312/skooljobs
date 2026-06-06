import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/login";
import Signup from "../auth/signup";
import PublicJobView from "../pages/PublicJobView";
import SchoolLayout from "../layouts/SchoolLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import SchoolHome from "../pages/school/SchoolHome";
import SchoolViewProfile from "../pages/school/SchoolViewProfile";
import SchoolPostJob from "../pages/school/SchoolPostJob";
import SchoolManageJobs from "../pages/school/SchoolManageJobs";
import SchoolJobDetail from "../pages/school/SchoolJobDetail";
import SchoolAllApplicants from "../pages/school/SchoolAllApplicants";
import SchoolInterviews from "../pages/school/SchoolInterviews";
import SchoolSavedCandidates from "../pages/school/SchoolSavedCandidates";
import SchoolPackages from "../pages/school/SchoolPackages";
import SchoolTransactions from "../pages/school/SchoolTransactions";
import SchoolSettings from "../pages/school/SchoolSettings";
import SchoolProfile from "../pages/school/SchoolProfile";
import TeacherHome from "../pages/teacher/TeacherHome";
import TeacherAllJobs from "../pages/teacher/TeacherAllJobs";
import TeacherRecommendation from "../pages/teacher/TeacherRecommendation";
import TeacherResume from "../pages/teacher/TeacherResume";
import TeacherActivity from "../pages/teacher/TeacherActivity";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import TeacherApplications from "../pages/teacher/TeacherApplications";
import TeacherInterviews from "../pages/teacher/TeacherInterviews";
import TeacherJobDetail from "../pages/teacher/TeacherJobDetail";
import TeacherSettings from "../pages/teacher/TeacherSettings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/public-job/:jobId" element={<PublicJobView />} />

      {/* School module — shared layout wraps all school sections */}
      <Route path="/school" element={<SchoolLayout />}>
        <Route index element={<Navigate to="/school/dashboard" replace />} />
        <Route path="dashboard" element={<SchoolHome />} />
        <Route path="view-profile" element={<SchoolViewProfile />} />
        <Route path="post-job" element={<SchoolPostJob />} />
        <Route path="manage-jobs" element={<SchoolManageJobs />} />
        <Route path="manage-jobs/:jobId" element={<SchoolJobDetail />} />
        <Route path="all-applicants" element={<SchoolAllApplicants />} />
        <Route path="interviews" element={<SchoolInterviews />} />
        <Route path="saved-candidates" element={<SchoolSavedCandidates />} />
        <Route path="packages" element={<SchoolPackages />} />
        <Route path="transactions" element={<SchoolTransactions />} />
        <Route path="settings" element={<SchoolSettings />} />
      </Route>
      <Route path="/school/profile" element={<SchoolProfile />} />

      {/* Teacher module — shared layout wraps all teacher sections */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherHome />} />
        <Route path="all-jobs" element={<TeacherAllJobs />} />
        <Route path="recommendation" element={<TeacherRecommendation />} />
        <Route path="resume" element={<TeacherResume />} />
        <Route path="activity" element={<TeacherActivity />} />
        <Route path="applications" element={<TeacherApplications />} />
        <Route path="interviews" element={<TeacherInterviews />} />
        <Route path="jobs/:jobId" element={<TeacherJobDetail />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>
      <Route path="/teacher/profile" element={<TeacherProfile />} />

      {/* Legacy redirects so old bookmarks / links still work */}
      <Route path="/school-dashboard" element={<Navigate to="/school/dashboard" replace />} />
      <Route path="/dashboard" element={<Navigate to="/teacher/dashboard" replace />} />
      <Route path="/school-profile" element={<Navigate to="/school/profile" replace />} />
      <Route path="/teacher-profile" element={<Navigate to="/teacher/profile" replace />} />
    </Routes>
  );
}

export default AppRoutes;
