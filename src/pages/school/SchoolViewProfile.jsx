import { useNavigate, useOutletContext } from "react-router-dom";
import { Building2 } from "lucide-react";

const SchoolViewProfile = () => {
  const navigate = useNavigate();
  const { logoImage, currentUser, schoolName } = useOutletContext();

  const details = [
    { label: "Email", value: currentUser.email || "Not added" },
    { label: "Phone", value: currentUser.phone || "Not added" },
    { label: "City", value: currentUser.city || "Not added" },
    { label: "Institute Name", value: schoolName },
    { label: "Account Type", value: "School / Institution" },
    {
      label: "Total Teachers",
      value: currentUser.totalTeachers ? `${currentUser.totalTeachers} Teachers` : "Not added",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">View Profile</h2>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-bold">Public Profile Visibility</p>
        <p className="mt-1">
          This profile is visible to shortlisted candidates and job applicants. You can control visibility below.
        </p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-borderColor bg-white shadow-soft">
        <div className="h-28 bg-primary" />
        <div className="relative px-6 pb-8">
          <div className="-mt-12 flex flex-col items-center gap-5 md:flex-row md:items-end">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-light shadow-md">
              {logoImage ? (
                <img src={logoImage} alt="logo" className="h-full w-full object-cover" />
              ) : (
                <Building2 size={36} className="text-primary" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900">{schoolName}</h2>
              <p className="mt-1 text-sm font-semibold text-primary">Schools &amp; Institutions</p>
            </div>
           <Button
  variant="outlined"
  type="button"
  onClick={() => navigate("/school/profile")}
>
  Edit Profile
</Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-2xl border border-borderColor bg-light p-4">
                <p className="text-xs font-bold uppercase text-slate-500">{detail.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{detail.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-borderColor bg-light px-4 py-3">
            <p className="text-sm font-bold text-slate-700">Profile visible to shortlisted candidates</p>
            <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">Open</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolViewProfile;
