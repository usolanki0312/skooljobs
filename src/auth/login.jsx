import { useState } from "react";
import AuthLayout from "../components/Authlayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("candidate");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    const existingUsersStr = localStorage.getItem("skooljobs_users");
    let users = [];
    if (existingUsersStr) {
      users = JSON.parse(existingUsersStr);
    }

    // For employer, allow a demo login
    if (activeTab === "employer" && username === "hr@school.in" && password === "password") {
      const demoEmployer = { email: username, name: "HR Manager", role: "employer" };
      localStorage.setItem("currentUser", JSON.stringify(demoEmployer));
      navigate("/dashboard");
      return;
    }

    const user = users.find((u) => (u.email === username || u.phone === username) && u.password === password && u.role === activeTab);
    
    if (user) {
      // Save current user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      if (activeTab === "employer") {
         alert("Invalid credentials. For demo, use hr@school.in / password");
      } else {
         alert("Invalid credentials. Please check your username and password, or sign up if you don't have an account.");
      }
    }
  };

  return (
    <AuthLayout 
      title={activeTab === 'candidate' ? "Login as a teacher" : "Login as a school"}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      
      {/* Header */}
      <div>
        <p className="uppercase tracking-[2px] text-secondary text-[11px] font-bold">
          Welcome Back
        </p>

        <div className="flex items-end justify-between mt-2">
          <h1 className="text-[28px] font-bold text-primary font-heading leading-none">
            {activeTab === 'candidate' ? "Login as a teacher" : "Login as a school"}
          </h1>

          <Link to="/" className="text-primary font-bold text-[13px] flex items-center gap-1 hover:underline">
            Back to Home <span>→</span>
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="mt-8 space-y-4">

        {/* Username */}
        <AuthInput
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={activeTab === 'candidate' ? "Email or Mobile Number" : "hr@school.in"}
        />

        {/* Password */}
        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {/* Remember me & Forgot Password aligned row */}
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2.5 cursor-pointer group select-none">
            <input type="checkbox" className="w-[18px] h-[18px] accent-primary rounded border-borderColor cursor-pointer" />
            <span className="text-[14px] text-primary font-semibold group-hover:text-primary/80 transition-colors">
              Remember me
            </span>
          </label>

          <Link to="/forgot-password" className="text-primary text-[13.5px] hover:underline font-bold transition-colors">
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <div className="pt-4">
          <AuthButton type="submit">
            Login to dashboard <span>→</span>
          </AuthButton>
        </div>

        {/* Footer */}
        {activeTab === 'candidate' && (
          <p className="mt-6 text-[13px] text-secondary">
            New to SkoolJobs?{" "}

            <Link
              to="/signup"
              className="text-primary font-bold hover:underline"
            >
              Create one here
            </Link>
          </p>
        )}

      </form>
    </AuthLayout>
  );
}

export default Login;