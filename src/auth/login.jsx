import { useState } from "react";
import AuthLayout from "../components/Authlayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import "@cloudstrytech/ui-components/styles.css";
import { Button, Input } from "@cloudstrytech/ui-components";
import styles from "./login.module.css";


// ---------------------------------------------------------------------------
// TODO: Replace hardcoded auth with backend API
//
// When real auth is ready, delete MOCK_CREDENTIALS entirely and replace the
// matching logic in handleLogin with a POST /api/auth/login call:
//
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) { setErrorMessage(data.message || "Invalid credentials."); return; }
//   localStorage.setItem("currentUser", JSON.stringify(data.user));
//   navigate(data.user.role === "employer" ? "/school-dashboard" : "/dashboard");
// ---------------------------------------------------------------------------

const MOCK_CREDENTIALS = [
  // --- Teacher / Candidate accounts ---
  {
    email: "teacher@gmail.com",
    password: "123456",
    user: {
      id: 1,
      name: "Rahul Sharma",
      firstName: "Rahul",
      lastName: "Sharma",
      email: "teacher@gmail.com",
      role: "candidate",
      phone: "9876543210",
      subject: "Mathematics",
      city: "Indore",
      experience: "5 Years",
      profilePhoto: "https://i.pravatar.cc/300?img=12",
    },
  },

  // --- School / Recruiter accounts ---
  {
    email: "hr@school.in",
    password: "password",
    user: {
      id: 2,
      name: "Green Valley School",
      companyName: "Green Valley School",
      email: "hr@school.in",
      role: "employer",
      city: "Bhopal",
      phone: "9999999999",
      totalTeachers: 45,
      profilePhoto: "https://i.pravatar.cc/300?img=20",
    },
  },
  {
    email: "schooladmin@test.com",
    password: "123456",
    user: {
      id: 3,
      name: "Sunrise Public School",
      companyName: "Sunrise Public School",
      email: "schooladmin@test.com",
      role: "employer",
      city: "Mumbai",
      phone: "9123456789",
      totalTeachers: 120,
      profilePhoto: "https://i.pravatar.cc/300?img=33",
    },
  },
  {
    email: "recruiter@test.com",
    password: "recruiter123",
    user: {
      id: 4,
      name: "EduHire Recruiters",
      companyName: "EduHire Recruiters",
      email: "recruiter@test.com",
      role: "employer",
      city: "Delhi",
      phone: "9876001234",
      totalTeachers: 0,
      profilePhoto: "https://i.pravatar.cc/300?img=47",
    },
  },

  // --- Head Admin account — separate login, manages multiple schools ---
  {
    email: "headadmin@skooljobs.com",
    password: "headadmin123",
    user: {
      id: 6,
      name: "EduHire Group Admin",
      companyName: "EduHire Recruiters Group",
      email: "headadmin@skooljobs.com",
      role: "headAdmin",
      city: "Delhi",
      phone: "9876005678",
      profilePhoto: "https://i.pravatar.cc/300?img=54",
      managedSchools: [
        "School 1 — Bhopal Central",
        "School 2 — Bhopal East",
        "School 3 — Indore",
        "School 4 — Indore South",
        "School 5 — Ujjain",
      ],
    },
  },

  // --- SkoolJobs Platform Admin account ---
  {
    email: "admin@skooljobs.com",
    password: "admin123",
    user: {
      id: 5,
      name: "SkoolJobs Admin",
      email: "admin@skooljobs.com",
      role: "admin",
      profilePhoto: "https://i.pravatar.cc/300?img=68",
    },
  },
];

function Login() {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    console.log(emailOrPhone, password);
    e.preventDefault();
    setErrorMessage("");

    if (!emailOrPhone || !password) {
      setErrorMessage("Please enter your email/mobile and password.");
      return;
    }

    // Load registered users and members from localStorage
    const usersStr = localStorage.getItem("skooljobs_users");
    const membersStr = localStorage.getItem("skooljobs_members");
    const customUsers = usersStr ? JSON.parse(usersStr) : [];
    const customMembers = membersStr ? JSON.parse(membersStr) : [];

    // Combine all mock and custom users for validation
    const allCredentials = [
      ...MOCK_CREDENTIALS,
      ...customUsers.map((u) => ({
        email: u.email,
        password: u.password,
        user: u,
      })),
      ...customMembers.map((m) => ({
        email: m.email,
        password: m.password,
        user: {
          ...m,
          role: "employer", // Route to school dashboard
          isMember: true,
        },
      })),
    ];

    const inputClean = emailOrPhone.trim();
    const match = allCredentials.find((c) => {
      const dbEmail = c.email ? c.email.toLowerCase() : "";
      const dbPhone = c.user?.phone ? c.user.phone.replace(/[\s+-]/g, "") : "";
      const queryClean = inputClean.replace(/[\s+-]/g, "");

      const emailMatches = dbEmail === inputClean.toLowerCase();
      const phoneMatches =
        dbPhone &&
        queryClean &&
        dbPhone.replace(/[\s+-]/g, "").endsWith(queryClean.replace(/[\s+-]/g, "")) &&
        queryClean.length >= 10;

      return (emailMatches || phoneMatches) && c.password === password;
    });

    if (match) {
      localStorage.setItem("currentUser", JSON.stringify(match.user));
      navigate(
        match.user.role === "admin"
          ? "/admin/dashboard"
          : match.user.role === "headAdmin"
            ? "/head-admin/dashboard"
            : match.user.role === "employer"
              ? "/school/dashboard"
              : "/teacher/dashboard",
      );
      return;
    }

    setErrorMessage("Invalid email/mobile or password. Please try again.");
  };

  return (
    <AuthLayout title="Welcome to SkoolJobs" activeTab="combined">
      <div>
        <p className={styles.eyebrow}>
          Welcome Back
        </p>
        <h1 className={styles.heading}>
          Login to your account
        </h1>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          label="Email or Mobile"
          floatingLabel
          type="text"
          value={emailOrPhone}
          onChange={setEmailOrPhone}
        />



        <Input
          label="Password"
          type={showPwd ? "text" : "password"}
          value={password}
          floatingLabel
          onChange={setPassword}
          endIcon={
            <button
              type="button"
              
              className="reveal-btn"
              aria-label={showPwd ? "Hide password" : "Show password"}
              aria-pressed={showPwd}
              onClick={() => setShowPwd((prev) => !prev)}
            >
            </button>
          }
        />

        {errorMessage && (
          <p className={styles.errorMessage}>
            {errorMessage}
          </p>
        )}

        <div className={styles.rememberRow}>
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              className={styles.rememberCheckbox}
            />
            <span className={styles.rememberText}>
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className={styles.forgotLink}
          >
            Forgot password?
          </Link>
        </div>

        <div className={styles.submitRow}>
          <Button variant="filled" fullWidth color="#03274c" type="submit">
            login to dashboard
          </Button>
        </div>

        <p className={styles.signupText}>
          New to SkoolJobs?{" "}
          <Link to="/signup" className={styles.signupLink}>
            <Button variant="filled">
              Sign up
            </Button>
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
