import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  HelpCircle,
  KeyRound,
  Save,
  Trash2,
  Users,
  ShieldAlert,
  ArrowLeftRight,
  UserPlus,
  X,
  Pencil,
} from "lucide-react";
import { inputClass } from "../../lib/formStyles";
import FormField from "../../components/FormField";

const SchoolSettings = () => {
  const { handleLogout, currentUser } = useOutletContext();

  const isAdmin = !currentUser.isMember;

  // Manage members list from localStorage (excludes default admin owner)
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("skooljobs_members");
    return saved ? JSON.parse(saved) : [];
  });

  // Delete account states
  const [deleteStep, setDeleteStep] = useState(0);
  const [deleteChecks, setDeleteChecks] = useState({ c1: false, c2: false });
  const [deleteOtp, setDeleteOtp] = useState("");
  const [deleteOtpSent, setDeleteOtpSent] = useState(false);

  // Password change state
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });

  // Member Form state (inline card)
  const [editingMember, setEditingMember] = useState(null); // null or { name, email, phone, memberRole, password }

  // OTP Verification state (inline card)
  const [otpState, setOtpState] = useState({
    isOpen: false,
    actionType: "", // "add" | "edit" | "delete" | "transfer"
    targetMemberId: null,
    formData: null,
    selectedPhone: "",
    otpSent: false,
    otpInput: "",
    error: "",
  });

  // Prepare members list containing Admin as the default row
  const adminRow = {
    id: "admin",
    name: currentUser.name || currentUser.companyName || "School Admin",
    email: currentUser.email || "hr@school.in",
    phone: currentUser.phone || "9999999999",
    memberRole: "Admin / Owner",
    isAdminRow: true
  };

  const allRows = [
    adminRow,
    ...members.map(m => ({
      ...m,
      memberRole: "Member",
      isAdminRow: false
    }))
  ];

  // Helper to trigger OTP verification inline
  const triggerOtpVerification = (actionType, targetId, formData = null) => {
    let defaultPhone = currentUser.phone || "9999999999";
    
    if (actionType === "edit" || actionType === "add") {
      defaultPhone = formData.phone || defaultPhone;
    } else if (actionType === "delete" || actionType === "transfer") {
      const memberObj = members.find(m => m.id === targetId);
      if (memberObj) {
        defaultPhone = memberObj.phone || defaultPhone;
      }
    }

    setOtpState({
      isOpen: true,
      actionType,
      targetMemberId: targetId,
      formData,
      selectedPhone: currentUser.phone || "9999999999", // Default to admin's phone
      otpSent: false,
      otpInput: "",
      error: "",
    });
  };

  const handleSendOtp = () => {
    setOtpState(prev => ({
      ...prev,
      otpSent: true,
      error: ""
    }));
    alert(`Demo OTP sent to ${otpState.selectedPhone}! Use code '123456' to verify.`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpState.otpInput !== "123456") {
      setOtpState(prev => ({ ...prev, error: "Invalid OTP! Please use code '123456' for the demo." }));
      return;
    }

    const { actionType, targetMemberId, formData } = otpState;

    if (actionType === "add") {
      const newMember = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        memberRole: "Member", // Restricted role
        password: formData.password,
        schoolEmail: currentUser.email,
        companyName: currentUser.companyName || currentUser.name || "Green Valley School",
      };
      const updated = [...members, newMember];
      setMembers(updated);
      localStorage.setItem("skooljobs_members", JSON.stringify(updated));
      setEditingMember(null);
      alert("Team member account created successfully!");
    } 
    
    else if (actionType === "edit") {
      const updated = members.map(m => m.id === targetMemberId ? {
        ...m,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        memberRole: "Member", // Restricted role
        ...(formData.password ? { password: formData.password } : {})
      } : m);
      setMembers(updated);
      localStorage.setItem("skooljobs_members", JSON.stringify(updated));
      setEditingMember(null);
      alert("Team member details updated successfully!");
    } 
    
    else if (actionType === "delete") {
      const updated = members.filter(m => m.id !== targetMemberId);
      setMembers(updated);
      localStorage.setItem("skooljobs_members", JSON.stringify(updated));
      alert("Team member account removed successfully!");
    } 
    
    else if (actionType === "transfer") {
      const promotedMember = members.find(m => m.id === targetMemberId);
      if (!promotedMember) return;

      // 1. Create a demoted member object for the current Admin
      const demotedAdmin = {
        id: Date.now(),
        name: currentUser.name || "School Admin",
        email: currentUser.email,
        phone: currentUser.phone || "9999999999",
        memberRole: "Member", // demoted to Member
        password: currentUser.password || "password",
        schoolEmail: promotedMember.email,
        companyName: currentUser.companyName || "Green Valley School",
      };

      // 2. Add promoted member as Admin to users database
      const usersStr = localStorage.getItem("skooljobs_users") || "[]";
      const users = JSON.parse(usersStr);
      const newAdminUser = {
        firstName: promotedMember.name.split(" ")[0],
        lastName: promotedMember.name.split(" ").slice(1).join(" "),
        email: promotedMember.email,
        phone: promotedMember.phone,
        password: promotedMember.password,
        name: promotedMember.name,
        companyName: currentUser.companyName || "Green Valley School",
        role: "employer",
      };
      
      const filteredUsers = users.filter(u => u.email !== promotedMember.email);
      filteredUsers.push(newAdminUser);
      localStorage.setItem("skooljobs_users", JSON.stringify(filteredUsers));

      // 3. Update skooljobs_members: remove promoted member, add demoted admin, update schoolEmail parent references
      const otherMembers = members.filter(m => m.id !== promotedMember.id);
      const updatedMembers = [
        ...otherMembers.map(m => ({ ...m, schoolEmail: promotedMember.email })),
        demotedAdmin
      ];
      localStorage.setItem("skooljobs_members", JSON.stringify(updatedMembers));

      // 4. Log out session
      localStorage.removeItem("currentUser");
      setOtpState(prev => ({ ...prev, isOpen: false }));
      alert("Ownership transferred successfully! Logging out. Please log in using the new Admin credentials.");
      handleLogout();
      return;
    }

    setOtpState({
      isOpen: false,
      actionType: "",
      targetMemberId: null,
      formData: null,
      selectedPhone: "",
      otpSent: false,
      otpInput: "",
      error: "",
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Settings</h2>

      {/* --- Member info for Non-Admins / Members --- */}
      {!isAdmin && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm flex items-start gap-4">
          <span className="rounded-xl bg-primary/10 p-3 text-primary shrink-0">
            <Users size={22} />
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Member Account Settings</h3>
            <p className="mt-1 text-sm text-slate-600">
              You are signed in as a team member with the role: <span className="font-bold text-primary">{currentUser.memberRole || "Member"}</span>.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Note: Team member accounts, member creation, and profile ownership configurations can only be managed by the primary School Admin ({currentUser.schoolEmail || "owner"}).
            </p>
          </div>
        </div>
      )}

      {/* --- Member Management (Admin Only) --- */}
      {isAdmin && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-borderColor pb-4">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-primary/10 p-2 text-primary">
                <Users size={18} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Team Members</h3>
                <p className="text-xs text-slate-400">Manage login credentials and access levels for your staff (Max 3 members).</p>
              </div>
            </div>
            <button
              type="button"
              disabled={members.length >= 3}
              onClick={() => {
                setEditingMember({ name: "", email: "", phone: "", memberRole: "Member", password: "" });
                setOtpState(prev => ({ ...prev, isOpen: false })); // Close OTP panel
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary/95 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <UserPlus size={14} /> Add Member ({members.length}/3)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-borderColor text-xs font-semibold uppercase text-slate-400 bg-slate-50/50">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor/60">
                {allRows.map((m) => (
                  <tr key={m.id} className="hover:bg-light/30 transition">
                    <td className="px-4 py-3.5 font-bold text-slate-800">{m.name}</td>
                    <td className="px-4 py-3.5 text-slate-600">{m.email}</td>
                    <td className="px-4 py-3.5 text-slate-600">{m.phone}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                        m.isAdminRow
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-primary/5 text-primary"
                      }`}>
                        {m.memberRole}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-2">
                      {m.isAdminRow ? (
                        <span className="text-xs text-slate-400 font-semibold italic">Primary Owner</span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingMember(m);
                              setOtpState(prev => ({ ...prev, isOpen: false })); // Close OTP panel
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-borderColor hover:bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition"
                          >
                            <Pencil size={12} /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              triggerOtpVerification("transfer", m.id);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-amber-200 hover:bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-600 transition"
                          >
                            <ArrowLeftRight size={12} /> Transfer Ownership
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerOtpVerification("delete", m.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 hover:bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-500 transition"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- INLINE ADD / EDIT MEMBER FORM CARD --- */}
      {isAdmin && editingMember && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex justify-between items-center border-b border-borderColor pb-3 mb-2">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <UserPlus className="text-primary" size={18} />
              {editingMember.id ? "Edit Team Member Details" : "Add New Team Member"}
            </h3>
            <button
              onClick={() => setEditingMember(null)}
              className="text-slate-400 hover:bg-slate-100 p-1.5 rounded-xl transition"
            >
              <X size={16} />
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!editingMember.name || !editingMember.email || !editingMember.phone || (!editingMember.id && !editingMember.password)) {
                alert("Please fill in all required fields.");
                return;
              }
              triggerOtpVerification(editingMember.id ? "edit" : "add", editingMember.id, editingMember);
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                value={editingMember.name}
                onChange={(e) => setEditingMember(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Ritesh Deshmukh"
                className="w-full border border-borderColor rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={editingMember.email}
                onChange={(e) => setEditingMember(p => ({ ...p, email: e.target.value }))}
                placeholder="e.g. ritesh@school.in"
                className="w-full border border-borderColor rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Mobile Number *</label>
              <input
                type="text"
                required
                value={editingMember.phone}
                onChange={(e) => setEditingMember(p => ({ ...p, phone: e.target.value }))}
                placeholder="e.g. 9876543210"
                className="w-full border border-borderColor rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Role (Fixed) *</label>
              <input
                type="text"
                disabled
                value="Member"
                className="w-full border border-borderColor/60 rounded-xl px-4 py-2.5 text-sm bg-slate-50 text-slate-400 font-bold outline-none cursor-not-allowed"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                {editingMember.id ? "New Password (leave blank to keep current)" : "Password *"}
              </label>
              <input
                type="password"
                required={!editingMember.id}
                value={editingMember.password || ""}
                onChange={(e) => setEditingMember(p => ({ ...p, password: e.target.value }))}
                placeholder={editingMember.id ? "••••••••" : "Enter password"}
                className="w-full border border-borderColor rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col-reverse gap-3 pt-3 border-t border-borderColor/60 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="rounded-xl border border-borderColor px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-light transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/95 transition"
              >
                Save &amp; Request OTP
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- INLINE OTP VERIFICATION CARD --- */}
      {isAdmin && otpState.isOpen && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-primary/10 p-1.5 text-primary">
                <ShieldAlert size={18} />
              </span>
              <h3 className="font-bold text-slate-800 text-base">
                Security Verification ({otpState.actionType.toUpperCase()})
              </h3>
            </div>
            <button
              onClick={() => setOtpState(p => ({ ...p, isOpen: false }))}
              className="text-slate-400 hover:bg-primary/10 p-1.5 rounded-xl transition"
            >
              <X size={16} />
            </button>
          </div>

          {!otpState.otpSent ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                To authorize this action, select where we should send the verification One-Time Passcode (OTP):
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-borderColor bg-white cursor-pointer hover:bg-light/40 transition">
                  <input
                    type="radio"
                    name="otpDest"
                    checked={otpState.selectedPhone === (currentUser.phone || "9999999999")}
                    onChange={() => setOtpState(p => ({ ...p, selectedPhone: currentUser.phone || "9999999999" }))}
                    className="accent-primary h-4.5 w-4.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-700">Admin's Number (You)</p>
                    <p className="text-xs text-slate-500">{currentUser.phone || "+91 99999 99999"}</p>
                  </div>
                </label>

                {/* If adding/editing, show the member phone inputted */}
                {otpState.formData?.phone && (
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-borderColor bg-white cursor-pointer hover:bg-light/40 transition">
                    <input
                      type="radio"
                      name="otpDest"
                      checked={otpState.selectedPhone === otpState.formData.phone}
                      onChange={() => setOtpState(p => ({ ...p, selectedPhone: otpState.formData.phone }))}
                      className="accent-primary h-4.5 w-4.5"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-700">Member's Number</p>
                      <p className="text-xs text-slate-500">{otpState.formData.phone}</p>
                    </div>
                  </label>
                )}

                {/* For Delete / Transfer, grab existing member's phone */}
                {(otpState.actionType === "delete" || otpState.actionType === "transfer") && (
                  (() => {
                    const mObj = members.find(m => m.id === otpState.targetMemberId);
                    return mObj && mObj.phone !== currentUser.phone ? (
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-borderColor bg-white cursor-pointer hover:bg-light/40 transition">
                        <input
                          type="radio"
                          name="otpDest"
                          checked={otpState.selectedPhone === mObj.phone}
                          onChange={() => setOtpState(p => ({ ...p, selectedPhone: mObj.phone }))}
                          className="accent-primary h-4.5 w-4.5"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-700">Member's Number</p>
                          <p className="text-xs text-slate-500">{mObj.phone}</p>
                        </div>
                      </label>
                    ) : null;
                  })()
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOtpState(p => ({ ...p, isOpen: false }))}
                  className="rounded-xl border border-borderColor bg-white px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-light transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/95 transition"
                >
                  Send OTP Code
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-slate-600 font-semibold">
                OTP code has been simulated and sent to <strong className="text-slate-800">{otpState.selectedPhone}</strong>.
              </p>
              <div className="bg-white p-3 rounded-xl border border-primary/10 text-xs text-primary font-semibold leading-relaxed">
                ℹ️ For demo verification, please use OTP code: <strong>123456</strong>
              </div>

              <FormField label="Enter Verification Code">
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpState.otpInput}
                  onChange={(e) => setOtpState(p => ({ ...p, otpInput: e.target.value }))}
                  placeholder="Enter 6-digit OTP"
                  className={`${inputClass} text-center tracking-[4px] font-bold text-base bg-white`}
                />
              </FormField>

              {otpState.error && (
                <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100">
                  ⚠️ {otpState.error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 pt-3 border-t border-primary/10 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOtpState(p => ({ ...p, otpSent: false, error: "" }))}
                  className="rounded-xl border border-borderColor bg-white px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-light transition"
                >
                  ← Change Phone
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/95 transition"
                >
                  Verify &amp; Confirm
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* --- Change Password --- */}
      <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary"><KeyRound size={18} /></span>
          <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <FormField label="Current Password">
            <input type="password" value={pwForm.current} onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))} className={inputClass} placeholder="Enter current password" />
          </FormField>
          <FormField label="New Password">
            <input type="password" value={pwForm.next} onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))} className={inputClass} placeholder="Enter new password" />
          </FormField>
          <FormField label="Confirm New Password">
            <input type="password" value={pwForm.confirm} onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))} className={inputClass} placeholder="Re-enter new password" />
          </FormField>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (!pwForm.current) { alert("Enter your current password."); return; }
              if (pwForm.next !== pwForm.confirm) { alert("New passwords do not match."); return; }
              if (pwForm.next.length < 6) { alert("Password must be at least 6 characters."); return; }
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
      <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-borderColor pb-4">
          <span className="rounded-xl bg-primary/10 p-2 text-primary"><HelpCircle size={18} /></span>
          <h3 className="text-lg font-bold text-slate-800">Help &amp; Support</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { q: "How do I post a job?", a: "Go to 'Post a New Job' in the sidebar, fill in the details and click Publish Job." },
            { q: "How do I shortlist candidates?", a: "Go to 'All Applicants', find a candidate and click the Shortlist button." },
            { q: "How do I view an applicant's resume?", a: "In All Applicants, click the Resume button next to any candidate's row." },
            { q: "How do I schedule an interview?", a: "Shortlist a candidate first, then go to Saved Candidates to coordinate." },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl bg-light p-4">
              <p className="text-sm font-bold text-slate-800">{faq.q}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
          <p className="font-bold text-primary">Need more help?</p>
          <p className="mt-1 text-slate-600">
            Email us at <span className="font-bold text-primary">support@skooljobs.in</span> — we respond within 24 hours.
          </p>
        </div>
      </div>

      {/* --- Delete Account --- */}
      <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-red-100 pb-4">
          <span className="rounded-xl bg-red-100 p-2 text-red-500"><Trash2 size={18} /></span>
          <h3 className="text-lg font-bold text-red-600">Delete Account</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          Permanently deleting your account will remove all job postings, applicant data, and profile information. This action is <strong>irreversible</strong>.
        </p>

        {deleteStep === 0 && (
          <button type="button" onClick={() => setDeleteStep(1)} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-300 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50">
            <Trash2 size={15} /> Request Account Deletion
          </button>
        )}

        {deleteStep === 1 && (
          <div className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-700">Confirmation Required — Step 1 of 2</p>
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={deleteChecks.c1} onChange={(e) => setDeleteChecks((p) => ({ ...p, c1: e.target.checked }))} className="mt-1 h-4 w-4 accent-red-500" />
              <span className="text-sm text-slate-700">I understand that all my job postings and applicant data will be permanently deleted.</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={deleteChecks.c2} onChange={(e) => setDeleteChecks((p) => ({ ...p, c2: e.target.checked }))} className="mt-1 h-4 w-4 accent-red-500" />
              <span className="text-sm text-slate-700">I confirm this is my account and I wish to permanently delete it. This cannot be undone.</span>
            </label>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                disabled={!deleteChecks.c1 || !deleteChecks.c2}
                onClick={() => { setDeleteStep(2); setDeleteOtpSent(true); alert("Demo OTP sent! Use code 123456 to confirm deletion."); }}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proceed to OTP Verification
              </button>
              <button type="button" onClick={() => { setDeleteStep(0); setDeleteChecks({ c1: false, c2: false }); }} className="rounded-xl border border-borderColor px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-light">
                Cancel
              </button>
            </div>
          </div>
        )}

        {deleteStep === 2 && (
          <div className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-bold text-red-700">OTP Verification — Step 2 of 2</p>
            {deleteOtpSent && <p className="text-xs text-slate-600">A 6-digit OTP has been sent to your registered email and mobile number.</p>}
            <FormField label="Enter OTP">
              <input value={deleteOtp} onChange={(e) => setDeleteOtp(e.target.value)} className={inputClass} placeholder="Enter 6-digit OTP" maxLength={6} />
            </FormField>
            <p className="text-xs text-slate-400">For demo: use OTP <strong>123456</strong></p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  if (deleteOtp !== "123456") { alert("Invalid OTP. Try 123456 for demo."); return; }
                  alert("Account deleted. Redirecting...");
                  handleLogout();
                }}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600"
              >
                Confirm Delete Account
              </button>
              <button type="button" onClick={() => { setDeleteStep(0); setDeleteChecks({ c1: false, c2: false }); setDeleteOtp(""); setDeleteOtpSent(false); }} className="rounded-xl border border-borderColor px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-light">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolSettings;
