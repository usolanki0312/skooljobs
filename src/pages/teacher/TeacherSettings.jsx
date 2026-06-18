import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { HelpCircle, KeyRound, Save, Trash2, Bell, Eye } from "lucide-react";
import { inputClass } from "../../lib/formStyles";
import FormField from "../../components/FormField";

const TeacherSettings = () => {
  const { handleLogout } = useOutletContext();

  // Settings state
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // Delete account states
  const [deleteStep, setDeleteStep] = useState(0);
  const [deleteChecks, setDeleteChecks] = useState({ c1: false, c2: false });
  const [deleteOtp, setDeleteOtp] = useState("");
  const [deleteOtpSent, setDeleteOtpSent] = useState(false);

  // Password change state
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Account Settings</h2>

      {/* --- Privacy & Visibility --- */}
      <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary">
            <Eye size={18} />
          </span>
          <h3 className="text-lg font-bold text-slate-800">
            Privacy &amp; Visibility
          </h3>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-bold text-slate-700">Profile Visibility</p>
            <p className="mt-1 text-sm text-slate-500">
              Allow verified schools to view your profile and contact you for
              teaching opportunities.
            </p>
          </div>
          <label className="relative inline-flex shrink-0 cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isProfileVisible}
              onChange={() => setIsProfileVisible(!isProfileVisible)}
            />
            <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
          </label>
        </div>
      </div>

      {/* --- Notification Preferences --- */}
      <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary">
            <Bell size={18} />
          </span>
          <h3 className="text-lg font-bold text-slate-800">
            Notification Preferences
          </h3>
        </div>
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-bold text-slate-700">Email Notifications</p>
              <p className="mt-1 text-sm text-slate-500">
                Receive interview invites and job recommendations directly to
                your inbox.
              </p>
            </div>
            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={notifPrefs.email}
                onChange={() =>
                  setNotifPrefs((p) => ({ ...p, email: !p.email }))
                }
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
          <div className="flex items-start justify-between gap-4 border-t border-borderColor/50 pt-6">
            <div className="min-w-0">
              <p className="font-bold text-slate-700">SMS Alerts</p>
              <p className="mt-1 text-sm text-slate-500">
                Get instant text alerts for critical updates like interview
                confirmations.
              </p>
            </div>
            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={notifPrefs.sms}
                onChange={() => setNotifPrefs((p) => ({ ...p, sms: !p.sms }))}
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
        </div>
      </div>

      {/* --- Change Password --- */}
      <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary">
            <KeyRound size={18} />
          </span>
          <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <FormField label="Current Password">
            <input
              type="password"
              value={pwForm.current}
              onChange={(e) =>
                setPwForm((p) => ({ ...p, current: e.target.value }))
              }
              className={inputClass}
              placeholder="Enter current password"
            />
          </FormField>
          <FormField label="New Password">
            <input
              type="password"
              value={pwForm.next}
              onChange={(e) =>
                setPwForm((p) => ({ ...p, next: e.target.value }))
              }
              className={inputClass}
              placeholder="Enter new password"
            />
          </FormField>
          <FormField label="Confirm New Password">
            <input
              type="password"
              value={pwForm.confirm}
              onChange={(e) =>
                setPwForm((p) => ({ ...p, confirm: e.target.value }))
              }
              className={inputClass}
              placeholder="Re-enter new password"
            />
          </FormField>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (!pwForm.current) {
                alert("Enter your current password.");
                return;
              }
              if (pwForm.next !== pwForm.confirm) {
                alert("New passwords do not match.");
                return;
              }
              if (pwForm.next.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
              }
              alert("Password updated successfully!");
              setPwForm({ current: "", next: "", confirm: "" });
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/95"
          >
            <Save size={16} /> Update Password
          </button>
        </div>
      </div>

      {/* --- Help & Support --- */}
      <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary">
            <HelpCircle size={18} />
          </span>
          <h3 className="text-lg font-bold text-slate-800">
            Help &amp; Support
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              q: "How do I apply for a job?",
              a: "Navigate to the 'All Jobs' section, click on a job card, and hit the 'Apply Now' button.",
            },
            {
              q: "How do I update my resume?",
              a: "Go to the 'Resume' tab in the sidebar where you can edit your skills and experience.",
            },
            {
              q: "Who can see my profile?",
              a: "If your profile visibility is ON, verified schools can discover you in their candidate search.",
            },
            {
              q: "How do I prepare for an interview?",
              a: "Check the 'Interviews' section for meeting links and preparation tips.",
            },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl bg-light p-4">
              <p className="text-sm font-bold text-slate-800">{faq.q}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
          <p className="font-bold text-primary">Need more help?</p>
          <p className="mt-1 text-slate-600">
            Email us at{" "}
            <span className="font-bold text-primary">support@skooljobs.in</span>{" "}
            — we respond within 24 hours.
          </p>
        </div>
      </div>

      {/* --- Delete Account --- */}
      <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-red-100 pb-4">
          <span className="rounded-xl bg-red-100 p-2 text-red-500">
            <Trash2 size={18} />
          </span>
          <h3 className="text-lg font-bold text-red-600">Delete Account</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          Permanently deleting your account will remove your profile,
          applications, and saved jobs. This action is{" "}
          <strong>irreversible</strong>.
        </p>

        {deleteStep === 0 && (
          <button
            type="button"
            onClick={() => setDeleteStep(1)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-300 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50"
          >
            <Trash2 size={15} /> Request Account Deletion
          </button>
        )}

        {deleteStep === 1 && (
          <div className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-700">
              Confirmation Required — Step 1 of 2
            </p>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={deleteChecks.c1}
                onChange={(e) =>
                  setDeleteChecks((p) => ({ ...p, c1: e.target.checked }))
                }
                className="mt-1 h-4 w-4 accent-red-500"
              />
              <span className="text-sm text-slate-700">
                I understand that my job applications and profile data will be
                permanently deleted.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={deleteChecks.c2}
                onChange={(e) =>
                  setDeleteChecks((p) => ({ ...p, c2: e.target.checked }))
                }
                className="mt-1 h-4 w-4 accent-red-500"
              />
              <span className="text-sm text-slate-700">
                I confirm this is my account and I wish to permanently delete
                it. This cannot be undone.
              </span>
            </label>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                disabled={!deleteChecks.c1 || !deleteChecks.c2}
                onClick={() => {
                  setDeleteStep(2);
                  setDeleteOtpSent(true);
                  alert("Demo OTP sent! Use code 123456 to confirm deletion.");
                }}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proceed to OTP Verification
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteStep(0);
                  setDeleteChecks({ c1: false, c2: false });
                }}
                className="rounded-xl border border-borderColor px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-light"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {deleteStep === 2 && (
          <div className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-700">
              OTP Verification — Step 2 of 2
            </p>
            {deleteOtpSent && (
              <p className="text-xs text-slate-600">
                A 6-digit OTP has been sent to your registered email and mobile
                number.
              </p>
            )}
            <FormField label="Enter OTP">
              <input
                value={deleteOtp}
                onChange={(e) => setDeleteOtp(e.target.value)}
                className={inputClass}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </FormField>
            <p className="text-xs text-slate-400">
              For demo: use OTP <strong>123456</strong>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  if (deleteOtp !== "123456") {
                    alert("Invalid OTP. Try 123456 for demo.");
                    return;
                  }
                  alert("Account deleted. Redirecting...");
                  handleLogout();
                }}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600"
              >
                Confirm Delete Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteStep(0);
                  setDeleteChecks({ c1: false, c2: false });
                  setDeleteOtp("");
                  setDeleteOtpSent(false);
                }}
                className="rounded-xl border border-borderColor px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-light"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSettings;
