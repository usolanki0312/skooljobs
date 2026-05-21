import React, { useState } from "react";
import TeacherProfile from "./TeacherProfile";

import {
  User,
  FileText,
  Briefcase,
  ClipboardCheck,
  FileBadge,
  Send,
} from "lucide-react";

const Dashboard = () => {

  const [activePage, setActivePage] = useState("profile");

  return (
    <div className="min-h-screen bg-[#eef2f7]">

      {/* Navbar */}
      <div className="h-20 bg-white border-b flex items-center justify-between px-10">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-900 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            S
          </div>

          <h1 className="text-4xl font-bold text-blue-900">
            SkoolJobs
          </h1>

        </div>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-3 bg-[#eef2f7] px-4 py-2 rounded-full">

            <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
              A
            </div>

            <p className="font-semibold text-blue-900">
              Aman Rajput
            </p>

          </div>

          <button className="bg-red-100 text-red-600 px-6 py-3 rounded-2xl font-semibold">
            Logout
          </button>

        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-8 p-8">

        {/* Sidebar */}
        <div className="w-[320px] bg-white rounded-[30px] shadow-sm p-6 h-[85vh] overflow-y-auto">

          <p className="text-sm text-blue-900 font-bold uppercase">
            Navigation Hub
          </p>

          <h2 className="text-4xl font-bold text-blue-900 mt-2">
            Teacher Panel
          </h2>

          <div className="border-b my-6"></div>

          <div className="space-y-4">

            {/* My Profile */}
            <div
              onClick={() => setActivePage("profile")}
              className={`flex items-center gap-4 px-6 py-5 rounded-2xl cursor-pointer transition 
               ${
                 activePage === "profile"
                   ? "bg-blue-900 text-white"
                   : "text-blue-900 hover:bg-[#eef2f7]"
               }`}
            >

              <User size={24} />

              <span className="text-xl font-semibold">
                My Profile
              </span>

            </div>

            {/* Resume */}
            <div
              onClick={() => setActivePage("resume")}
              className="flex items-center gap-4 px-6 py-4 text-blue-900 hover:bg-[#eef2f7] rounded-2xl cursor-pointer transition"
            >

              <FileText size={22} />

              <span className="text-lg font-semibold">
                My Resume
              </span>

            </div>

            {/* Recommended */}
            <div
              onClick={() => setActivePage("recommended")}
              className="flex items-center gap-4 px-6 py-4 text-blue-900 hover:bg-[#eef2f7] rounded-2xl cursor-pointer transition"
            >

              <Briefcase size={22} />

              <span className="text-lg font-semibold">
                Recommended Jobs
              </span>

            </div>

            {/* Recent */}
            <div
              onClick={() => setActivePage("recent")}
              className="flex items-center gap-4 px-6 py-4 text-blue-900 hover:bg-[#eef2f7] rounded-2xl cursor-pointer transition"
            >

              <ClipboardCheck size={22} />

              <span className="text-lg font-semibold">
                Recent Activity
              </span>

            </div>

            {/* Completion */}
            <div
              onClick={() => setActivePage("completion")}
              className="flex items-center justify-between px-6 py-4 text-blue-900 hover:bg-[#eef2f7] rounded-2xl cursor-pointer transition"
            >

              <div className="flex items-center gap-4">

                <User size={22} />

                <span className="text-lg font-semibold">
                  Profile Completion
                </span>

              </div>

              <div className="bg-blue-100 text-blue-900 w-14 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                85%
              </div>

            </div>

            {/* Applied */}
            <div
              onClick={() => setActivePage("applied")}
              className="flex items-center justify-between px-6 py-4 text-blue-900 hover:bg-[#eef2f7] rounded-2xl cursor-pointer transition"
            >

              <div className="flex items-center gap-4">

                <ClipboardCheck size={22} />

                <span className="text-lg font-semibold">
                  Applied Jobs
                </span>

              </div>

              <div className="bg-blue-100 text-blue-900 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>

            </div>

            {/* CV */}
            <div
              onClick={() => setActivePage("cv")}
              className="flex items-center gap-4 px-6 py-4 text-blue-900 hover:bg-[#eef2f7] rounded-2xl cursor-pointer transition"
            >

              <FileBadge size={22} />

              <span className="text-lg font-semibold">
                CV & Cover Letter
              </span>

            </div>

          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1">

          {activePage === "profile" && <TeacherProfile />}

          {activePage === "resume" && (
            <div className="bg-white rounded-[30px] p-10 shadow-sm">
              <h1 className="text-4xl font-bold text-blue-900">
                My Resume
              </h1>
            </div>
          )}

          {activePage === "recommended" && (
            <div className="bg-white rounded-[30px] p-10 shadow-sm">
              <h1 className="text-4xl font-bold text-blue-900">
                Recommended Jobs
              </h1>
            </div>
          )}

          {activePage === "recent" && (
            <div className="bg-white rounded-[30px] p-10 shadow-sm">
              <h1 className="text-4xl font-bold text-blue-900">
                Recent Activity
              </h1>
            </div>
          )}

        </div>

        {/* Chat Box */}
        <div className="w-[420px] bg-white rounded-[30px] shadow-sm overflow-hidden h-[85vh] flex flex-col">

          <div className="bg-blue-900 text-white p-6">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-3xl font-bold">
                  Direct Messaging
                </h2>

                <p className="text-lg mt-2 text-blue-100">
                  Recruiter Connect
                </p>

              </div>

              <div className="w-4 h-4 bg-green-400 rounded-full"></div>

            </div>
          </div>

          <div className="flex-1 p-5"></div>

          <div className="p-4 border-t flex items-center gap-4">

            <input
              type="text"
              placeholder="Write message..."
              className="flex-1 bg-[#eef2f7] rounded-2xl px-6 py-4 outline-none"
            />

            <button className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center">
              <Send />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;