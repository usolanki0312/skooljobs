import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {

  const currentUser =
    localStorage.getItem("currentUser");

  if (!currentUser) {

    navigate("/login");
  }

}, [navigate]);
 const handleLogout = () => {

  localStorage.removeItem("currentUser");

  localStorage.removeItem("userName");

  window.location.href = "/";
};

  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150"
  );

  const loggedInUser =
    localStorage.getItem("userName") || "Gopal";

  const jobsData = [
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      location: "Bangalore",
      skill: "React",
    },

    {
      id: 2,
      company: "Microsoft",
      role: "React Developer",
      location: "Hyderabad",
      skill: "React",
    },

    {
      id: 3,
      company: "Amazon",
      role: "UI Designer",
      location: "Pune",
      skill: "UI/UX",
    },

    {
      id: 4,
      company: "Infosys",
      role: "Java Developer",
      location: "Indore",
      skill: "Java",
    },
  ];

  const resumes = [
    {
      id: 1,
      name: "React Resume.pdf",
      skill: "React",
    },

    {
      id: 2,
      name: "Java Resume.pdf",
      skill: "Java",
    },

    {
      id: 3,
      name: "UIUX Resume.pdf",
      skill: "UI/UX",
    },

    {
      id: 4,
      name: "FullStack Resume.pdf",
      skill: "React",
    },
  ];

  const [selectedResume, setSelectedResume] =
    useState(resumes[0]);

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const recommendedJobs = jobsData.filter(
    (job) => job.skill === selectedResume.skill
  );

  const handleApply = (job) => {

    const alreadyApplied = appliedJobs.find(
      (item) => item.id === job.id
    );

    if (!alreadyApplied) {

      setAppliedJobs([...appliedJobs, job]);

      setActivities([
        `Applied for ${job.role} at ${job.company}`,
        ...activities,
      ]);
    }
  };

  const handleSave = (job) => {

    const alreadySaved = savedJobs.find(
      (item) => item.id === job.id
    );

    if (!alreadySaved) {

      setSavedJobs([...savedJobs, job]);

      setActivities([
        `Saved ${job.role} at ${job.company}`,
        ...activities,
      ]);
    }
  };
  

  

  const handleProfileImage = (event) => {

    const file = event.target.files[0];

    if (file) {

      setProfileImage(
        URL.createObjectURL(file)
      );

      setActivities([
        "Updated profile photo",
        ...activities,
      ]);
    }
  };

  return (
    <div className="flex bg-light min-h-screen">

      {/* SIDEBAR */}

      <div className="w-64 bg-primary text-white min-h-screen p-5">

        <div className="flex flex-col items-center">

          <img
            src={profileImage}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />

          <label className="mt-4 bg-white text-primary px-4 py-2 rounded-xl cursor-pointer text-sm font-semibold">

            Upload Photo

            <input
              type="file"
              hidden
              onChange={handleProfileImage}
            />

          </label>

          <h2 className="mt-4 text-xl font-bold">
            {loggedInUser}
          </h2>

        </div>

        <div className="mt-10 flex flex-col gap-4">

          <button
            onClick={() => setActiveSection("dashboard")}
            className="bg-white/20 p-3 rounded-xl text-left"
          >
            Dashboard
          </button>

        <button
  onClick={() => navigate("/teacher-profile")}
  className="bg-white/20 p-3 rounded-xl text-left"
>
  My Profile
</button>

          <button
            onClick={() => setActiveSection("alljobs")}
            className="bg-white/20 p-3 rounded-xl text-left"
          >
            All Jobs
          </button>

          <button
            onClick={() => setActiveSection("recommendation")}
            className="bg-white/20 p-3 rounded-xl text-left"
          >
            Recommendation
          </button>

          <button
            onClick={() => setActiveSection("resume")}
            className="bg-white/20 p-3 rounded-xl text-left"
          >
            Resume
          </button>

          <button
            onClick={() => setActiveSection("activity")}
            className="bg-white/20 p-3 rounded-xl text-left"
          >
            Recent Activity
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 p-3 rounded-xl text-left mt-10"
          >
            Logout
          </button>

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-6">

        <Topbar />

        {/* DASHBOARD */}

        {activeSection === "dashboard" && (

          <>
            <div className="grid grid-cols-4 gap-6 mt-6">

              <div
                onClick={() =>
                  setActiveSection("applied")
                }
                className="bg-white rounded-2xl shadow-soft p-5 cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-primary">
                  Applied Jobs
                </h2>

                <p className="text-4xl font-bold mt-4">
                  {appliedJobs.length}
                </p>
              </div>

              <div
                onClick={() =>
                  setActiveSection("saved")
                }
                className="bg-white rounded-2xl shadow-soft p-5 cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-primary">
                  Saved Jobs
                </h2>

                <p className="text-4xl font-bold mt-4">
                  {savedJobs.length}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-soft p-5">

                <h2 className="text-lg font-semibold text-primary">
                  Interviews
                </h2>

                <p className="text-4xl font-bold mt-4">
                  03
                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-soft p-5">

                <h2 className="text-lg font-semibold text-primary">
                  Profile Score
                </h2>

                <p className="text-4xl font-bold mt-4">
                  75%
                </p>

              </div>

            </div>
<div className="flex gap-6 mt-6">

  {/* RECOMMENDED JOBS */}

  <div className="flex-1 bg-white rounded-2xl shadow-soft p-6">

    <h2 className="text-2xl font-bold text-primary mb-6">
      Recommended Jobs
    </h2>

    <div className="grid grid-cols-2 gap-6">

      {recommendedJobs.map((job) => (

        <div
          key={job.id}
          className="border border-borderColor rounded-2xl p-5"
        >

          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="job"
            className="w-full h-40 object-cover rounded-xl"
          />

          <h3 className="text-xl font-bold text-primary mt-4">
            {job.role}
          </h3>

          <p className="text-gray-600 mt-2">
            {job.company}
          </p>

          <p className="text-gray-500 text-sm mt-1">
            {job.location}
          </p>

          <div className="flex gap-4 mt-5">

            {/* APPLY BUTTON */}

            <button
              onClick={() => handleApply(job)}
              disabled={appliedJobs.some(
                (item) => item.id === job.id
              )}
              className={`px-4 py-2 rounded-xl text-white ${
                appliedJobs.some(
                  (item) => item.id === job.id
                )
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-primary"
              }`}
            >

              {appliedJobs.some(
                (item) => item.id === job.id
              )
                ? "Applied"
                : "Apply"}

            </button>

            {/* SAVE BUTTON */}

            <button
              onClick={() => handleSave(job)}
              disabled={savedJobs.some(
                (item) => item.id === job.id
              )}
              className={`px-4 py-2 rounded-xl border ${
                savedJobs.some(
                  (item) => item.id === job.id
                )
                  ? "bg-green-500 text-white border-green-500 cursor-not-allowed"
                  : "border-primary text-primary"
              }`}
            >

              {savedJobs.some(
                (item) => item.id === job.id
              )
                ? "Saved"
                : "Save"}

            </button>

          </div>

        </div>
      ))}

    </div>

  </div>

 

  <div className="w-[280px] bg-white rounded-2xl shadow-soft p-5 h-fit">

    <div className="flex items-center gap-3 border-b border-borderColor pb-4">

      <img
        src={profileImage}
        alt="profile"
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>

        <h3 className="font-bold text-primary">
          {loggedInUser}
        </h3>

        <p className="text-sm text-green-500">
          Online
        </p>

      </div>

    </div>

    <div className="h-[300px] overflow-y-auto mt-4 flex flex-col gap-3">

      <div className="bg-light p-3 rounded-xl text-sm">
        Welcome to SkoolJobs 👋
      </div>

      <div className="bg-primary text-white p-3 rounded-xl text-sm ml-auto">
        Hello Sir
      </div>

    </div>

    <input
      type="text"
      placeholder="Type message..."
      className="w-full border border-borderColor p-3 rounded-xl mt-4 outline-none"
    />

  </div>

</div>
        </>
)}

        {/* APPLIED JOBS */}

        {activeSection === "applied" && (

          <div className="bg-white rounded-2xl shadow-soft p-6 mt-6">

            <h2 className="text-2xl font-bold text-primary mb-6">
              Applied Jobs
            </h2>

            {appliedJobs.length === 0 ? (
              <p>No Applied Jobs</p>
            ) : (
              appliedJobs.map((job) => (

                <div
                  key={job.id}
                  className="border border-borderColor rounded-xl p-5 mb-4"
                >
                  <h3 className="font-bold text-primary">
                    {job.role}
                  </h3>

                  <p>{job.company}</p>

                  <p>{job.location}</p>

                </div>
              ))
            )}

          </div>
        )}

        {/* SAVED JOBS */}

        {activeSection === "saved" && (

          <div className="bg-white rounded-2xl shadow-soft p-6 mt-6">

            <h2 className="text-2xl font-bold text-primary mb-6">
              Saved Jobs
            </h2>

            {savedJobs.length === 0 ? (
              <p>No Saved Jobs</p>
            ) : (
              savedJobs.map((job) => (

                <div
                  key={job.id}
                  className="border border-borderColor rounded-xl p-5 mb-4"
                >
                  <h3 className="font-bold text-primary">
                    {job.role}
                  </h3>

                  <p>{job.company}</p>

                  <p>{job.location}</p>

                </div>
              ))
            )}

          </div>
        )}

        {/* ALL JOBS */}

        {activeSection === "alljobs" && (

          <div className="bg-white rounded-2xl shadow-soft p-6 mt-6">

            <h2 className="text-2xl font-bold text-primary mb-6">
              All Jobs
            </h2>

            <div className="grid grid-cols-2 gap-6">

              {jobsData.map((job) => (

                <div
                  key={job.id}
                  className="border border-borderColor rounded-xl p-5"
                >
                  <h3 className="font-bold text-primary">
                    {job.role}
                  </h3>

                  <p>{job.company}</p>

                  <p>{job.location}</p>

                  <div className="flex gap-4 mt-4">

                 <button
  onClick={() => handleApply(job)}
  disabled={appliedJobs.some(
    (item) => item.id === job.id
  )}
  className={`px-4 py-2 rounded-xl text-white ${
    appliedJobs.some(
      (item) => item.id === job.id
    )
      ? "bg-green-500 cursor-not-allowed"
      : "bg-primary"
  }`}
>

  {appliedJobs.some(
    (item) => item.id === job.id
  )
    ? "Applied"
    : "Apply"}

</button>

<button
  onClick={() => handleSave(job)}
  disabled={savedJobs.some(
    (item) => item.id === job.id
  )}
  className={`px-4 py-2 rounded-xl border ${
    savedJobs.some(
      (item) => item.id === job.id
    )
      ? "bg-green-500 text-white border-green-500 cursor-not-allowed"
      : "border-primary text-primary"
  }`}
>

  {savedJobs.some(
    (item) => item.id === job.id
  )
    ? "Saved"
    : "Save"}

</button>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* RESUME */}

        {activeSection === "resume" && (

          <div className="bg-white rounded-2xl shadow-soft p-6 mt-6">

            <h2 className="text-2xl font-bold text-primary mb-6">
              My Resume
            </h2>

            <div className="grid grid-cols-2 gap-6">

              {resumes.map((resume) => (

                <div
                  key={resume.id}
                  onClick={() =>
                    setSelectedResume(resume)
                  }
                  className="border border-borderColor rounded-xl p-5 cursor-pointer"
                >
                  <h3 className="font-bold text-primary">
                    {resume.name}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Skill : {resume.skill}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* RECOMMENDATION */}

        {activeSection === "recommendation" && (

          <div className="bg-white rounded-2xl shadow-soft p-6 mt-6">

            <h2 className="text-2xl font-bold text-primary mb-6">
              Resume Based Recommendation
            </h2>

            <p className="mb-6 text-gray-500">
              Selected Resume :
              {selectedResume.name}
            </p>

            <div className="grid grid-cols-2 gap-6">

              {recommendedJobs.map((job) => (

                <div
                  key={job.id}
                  className="border border-borderColor rounded-xl p-5"
                >
                  <h3 className="font-bold text-primary">
                    {job.role}
                  </h3>

                  <p>{job.company}</p>

                  <p>{job.location}</p>

                </div>
              ))}

            </div>

          </div>
        )}
        {/* CHAT BOX */}



        {/* RECENT ACTIVITY */}

        {activeSection === "activity" && (

          <div className="bg-white rounded-2xl shadow-soft p-6 mt-6">

            <h2 className="text-2xl font-bold text-primary mb-6">
              Recent Activity
            </h2>

            {activities.length === 0 ? (

              <p>No Recent Activity</p>

            ) : (

              activities.map((activity, index) => (

                <div
                  key={index}
                  className="border border-borderColor rounded-xl p-4 mb-4"
                >
                  {activity}
                </div>
              ))
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;