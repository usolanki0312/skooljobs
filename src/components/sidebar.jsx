import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Star,
  Clock3,
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-primary text-white p-5 flex flex-col">

      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full border-4 border-white"></div>

        <p className="mt-4 font-semibold">Profile : 75%</p>

        <div className="w-full bg-white/30 rounded-full h-2 mt-2">
          <div className="bg-white h-2 rounded-full w-[75%]"></div>
        </div>
      </div>

      <nav className="flex flex-col gap-4">

        <Link
          to="/"
          className="flex items-center gap-3 hover:bg-secondary p-3 rounded-xl transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/my-profile"
          className="flex items-center gap-3 hover:bg-secondary p-3 rounded-xl transition"
        >
          <User size={20} />
          My Profile
        </Link>

        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-xl transition cursor-pointer">
          <FileText size={20} />
          Resume
        </div>

        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-xl transition cursor-pointer">
          <Briefcase size={20} />
          All Jobs
        </div>

        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-xl transition cursor-pointer">
          <Star size={20} />
          Recommendations
        </div>

        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-xl transition cursor-pointer">
          <Clock3 size={20} />
          Recent Activity
        </div>
      </nav>

      <div className="mt-auto text-sm text-white/70">
        © 2026 Job Portal
      </div>
    </div>
  );
};

export default Sidebar;