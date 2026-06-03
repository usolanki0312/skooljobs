import { useState } from "react";
import AuthLayout from "../components/Authlayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";

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
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    // TODO: Replace hardcoded auth with backend API (see comment above MOCK_CREDENTIALS)
    const match = MOCK_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );

    if (match) {
      localStorage.setItem("currentUser", JSON.stringify(match.user));
      navigate(match.user.role === "employer" ? "/school/dashboard" : "/teacher/dashboard");
      return;
    }

    setErrorMessage("Invalid email or password. Please try again.");
  };

  return (
    <AuthLayout title="Welcome to SkoolJobs">
      <div>
        <p className="uppercase tracking-[2px] text-secondary text-[11px] font-bold">
          Welcome Back
        </p>
        <h1 className="mt-2 text-2xl font-bold text-primary font-heading leading-tight sm:text-[28px]">
          Login to your account
        </h1>
      </div>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teacher@gmail.com"
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {errorMessage && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-[18px] h-[18px] accent-primary rounded border-borderColor cursor-pointer"
            />
            <span className="text-[14px] text-primary font-semibold">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-primary text-[13.5px] hover:underline font-bold"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-2">
          <AuthButton type="submit">
            Login to dashboard <span>→</span>
          </AuthButton>
        </div>

        <p className="mt-6 text-[13px] text-secondary">
          New to SkoolJobs?{" "}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
