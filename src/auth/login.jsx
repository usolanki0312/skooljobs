import { useState } from "react";
import AuthLayout from "../components/Authlayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("candidate");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!username || !password) {

      alert(
        "Please enter username and password"
      );

      return;
    }

    // TEACHER LOGIN

    if (
      activeTab === "candidate" &&
      username === "teacher@gmail.com" &&
      password === "123456"
    ) {

      const dummyTeacher = {

        id: 1,

        name: "Rahul Sharma",

        email: "teacher@gmail.com",

        role: "candidate",

        phone: "9876543210",

        subject: "Mathematics",

        city: "Indore",

        experience: "5 Years",

        profilePhoto:
          "https://i.pravatar.cc/300?img=12"
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(dummyTeacher)
      );

      navigate("/dashboard");

      return;
    }

    // SCHOOL LOGIN

    if (
      activeTab === "employer" &&
      username === "hr@school.in" &&
      password === "password"
    ) {

      const dummySchool = {

        id: 2,

        name: "Green Valley School",

        email: "hr@school.in",

        role: "employer",

        city: "Bhopal",

        phone: "9999999999",

        totalTeachers: 45,

        profilePhoto:
          "https://i.pravatar.cc/300?img=20"
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(dummySchool)
      );

      navigate("/dashboard");

      return;
    }

    alert("Invalid Credentials");
  };

  return (

    <AuthLayout
      title={
        activeTab === "candidate"
          ? "Login Teacher's"
          : "Login as a school"
      }

      activeTab={activeTab}

      onTabChange={setActiveTab}
    >

      {/* HEADER */}

      <div>

        <p className="uppercase tracking-[2px] text-secondary text-[11px] font-bold">

          Welcome Back

        </p>

        <div className="flex items-end justify-between mt-2">

          <h1 className="text-2xl font-bold text-primary font-heading leading-tight sm:text-[28px]">

            {
              activeTab === "candidate"
                ? "Login Teacher's"
                : "Login as a school"
            }

          </h1>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleLogin}
        className="mt-8 space-y-4"
      >

        {/* USERNAME */}

        <AuthInput
          label="Username"
          name="username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }

          placeholder={
            activeTab === "candidate"
              ? "teacher@gmail.com"
              : "hr@school.in"
          }
        />

        {/* PASSWORD */}

        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }

          placeholder={
            activeTab === "candidate"
              ? "123456"
              : "password"
          }
        />

        {/* REMEMBER */}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">

          <label className="flex items-center gap-2.5 cursor-pointer group select-none">

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

        {/* BUTTON */}

        <div className="pt-4">

          <AuthButton type="submit">

            Login to dashboard <span>→</span>

          </AuthButton>

        </div>

        {/* DEMO CREDENTIALS */}

      

        {/* FOOTER */}

        {activeTab === "candidate" && (

          <p className="mt-6 text-[13px] text-secondary">

            New to SkoolJobs?{" "}

            <Link
              to="/signup"
              className="text-primary font-bold hover:underline"
            >

              Sign up

            </Link>

          </p>
        )}

      </form>

    </AuthLayout>
  );
}

export default Login;
