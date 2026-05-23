import { Bell, Search, Settings } from "lucide-react";

const Topbar = ({ title = "Teacher Dashboard", subtitle = "Find your next teaching opportunity today." }) => {
  let currentUser = {};

  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  } catch {
    currentUser = {};
  }

  const displayName = currentUser.name || currentUser.firstName || "Gopal";
  const profilePhoto = currentUser.profilePhoto || "https://i.pravatar.cc/300?img=12";

  return (
    <div className="rounded-3xl bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[2px] text-secondary">
            Welcome back, {displayName}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-2xl border border-borderColor bg-light px-4 py-3">
          <Search size={17} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs, schools..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <button className="rounded-2xl border border-borderColor p-3 text-primary hover:bg-light" type="button">
          <Bell size={18} />
        </button>
        <button className="rounded-2xl border border-borderColor p-3 text-primary hover:bg-light" type="button">
          <Settings size={18} />
        </button>
        <img src={profilePhoto} alt="profile" className="h-11 w-11 rounded-2xl object-cover" />
      </div>
    </div>
  );
};

export default Topbar;
