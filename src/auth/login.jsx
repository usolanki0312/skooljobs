import { useState } from "react";
import AuthLayout from "../components/Authlayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";

const VALID_CREDENTIALS = [
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
];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const match = VALID_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );

    if (match) {
      localStorage.setItem("currentUser", JSON.stringify(match.user));
      navigate("/select-role");
      return;
    }

    alert("Invalid credentials");
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
