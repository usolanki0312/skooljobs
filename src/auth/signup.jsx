import { useState } from "react";
import AuthLayout from "../components/Authlayout";
import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import "@cloudstrytech/ui-components/styles.css";
import { Button, Input } from "@cloudstrytech/ui-components";
import styles from "./signup.module.css";

function Signup() {
  const navigate = useNavigate();
  // We keep activeTab state internally as "candidate" to maintain compatibility with AuthLayout's internal state
  const activeTab = "candidate";

  // Step state: "details" | "otp" | "password"
  const [step, setStep] = useState("details");
  const [otpValue, setOtpValue] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields (First Name, Email, and Phone)");
      return;
    }
    // Transition to separate OTP verification screen
    setStep("otp");
    alert("Demo OTP sent! Use OTP code '123456' to verify.");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpValue === "123456") {
      setStep("password");
      alert("OTP verified successfully! Please set your password to complete registration.");
    } else {
      alert("Invalid OTP code! Please use '123456' for the demo.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      alert("Please enter and confirm your password");
      return;
    }

    if (!formData.agreeTerms) {
      alert("You must agree to the Terms of Service & Privacy Policy to register");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users or initialize empty array
    const existingUsersStr = localStorage.getItem("skooljobs_users");
    let users = [];
    if (existingUsersStr) {
      users = JSON.parse(existingUsersStr);
    }

    // Check if user already exists
    if (users.find(u => u.email === formData.email && u.role === "candidate")) {
      alert("User with this email already exists!");
      return;
    }

    // Save new user
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      role: "candidate"
    };
    users.push(newUser);
    localStorage.setItem("skooljobs_users", JSON.stringify(users));

    // Auto login
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    navigate("/teacher/dashboard");
  };

  return (
    <AuthLayout
      title={
        step === "otp"
          ? "Verify your number"
          : "Sign up as the Teacher's"
      }
      activeTab={activeTab}
    >

      <div>
        <p className={styles.eyebrow}>
          {step === "otp"
            ? "Account Verification"
            : "Create Your Profile"}
        </p>

        <div className={styles.headingRow}>
          <h1 className={styles.heading}>
            {step === "otp"
              ? "OTP Verification"
              : "Sign up as the Teacher's"}
          </h1>
        </div>
      </div>

      {/* Screen Form Content Area */}
      <div className={styles.formArea}>

        {/* Screen 1: Details Form */}
        {step === "details" && (
          <form onSubmit={handleSendOtp} className={styles.form}>
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: value,
                }))
              }
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: value,
                }))
              }

            />

            <Input
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  email: value,
                }))
              }
            />

            <div className={styles.colSpan2}>
              <Input
                label="Phone Number *"
                type="tel"
                value={formData.phone}
                placeholder=""
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: value,
                  }))
                }
              />
            </div>

            <div className={styles.submitRow}>
              <Button variant="filled" fullWidth color="#03274c" type="submit">
                Send OTP Verification Code
              </Button>
            </div>
          </form>
        )}

        {/* Screen 2: OTP Verification (Details are hidden!) */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <div className={styles.otpInfoBox}>
              ℹ️ We have sent a verification code to <strong>{formData.phone}</strong> and <strong>{formData.email}</strong>.
              <div className={styles.otpDemoCode}>
                For demo verification, please use code: <strong>123456</strong>
              </div>
            </div>

            <div className={styles.colSpan2}>
              <Input
                label="Enter 6-Digit OTP *"
                type="tel"
                value={otpValue}
                placeholder=""
                onChange={(value) => setOtpValue(value.replace(/\D/g, "").slice(0, 6))}
              />
            </div>

            {/* Downsized buttons side by side */}
            <div className={styles.otpActionsRow}>
              <Button variant="filled" color="#1D5A9B">
                back
              </Button>

              <Button type="submit" variant="filled">
                Verify OTP →
              </Button>
            </div>
          </form>
        )}

        {/* Screen 3: Password Page (Basic Details reappear as greyed out / disabled) */}
        {step === "password" && (
          <form onSubmit={handleSignup} className={styles.form}>
            <div className={styles.verifiedBox}>
              <svg className={styles.verifiedIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Mobile & Email verified successfully via OTP!
            </div>

            {/* Reappearing Disabled Fields */}
            <div className={styles.disabledFieldsGroup}>
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: value,
                  }))
                }
                disabled
              />
              <AuthInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                colSpan="col-span-2"
                disabled={true}
              />

              <AuthInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                colSpan="col-span-2"
                disabled={true}
              />

              <AuthInput
                label="Phone Number"
                name="phone"
                value={formData.phone}
                colSpan="col-span-2"
                disabled={true}
              />
            </div>

            {/* Active Password Attributes */}
            <div className={styles.colSpan2}>
              <Input
                label="Create Password *"
                type="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: value,
                  }))
                }
              />
            </div>

            <div className={styles.colSpan2}>
              <Input
                label="Save Password *"
                type="password"
                value={formData.confirmPassword}
                placeholder="Re-enter password"
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: value,
                  }))
                }
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className={styles.termsRow}>
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                className={styles.termsCheckbox}
              />
              <label htmlFor="terms" className={styles.termsLabel}>
                I agree to the <span className={styles.termsLink}>Terms of Service</span> & <span className={styles.termsLink}>Privacy Policy</span>
              </label>
            </div>

            <div className={styles.submitRow}>
              <Button variant="filled" fullWidth color="#03274c" type="submit">
                Create Account
              </Button>
            </div>
          </form>
        )}

      </div>

      <p className={styles.loginText}>
        Already have an account?{" "}
        <Link
          to="/"
          className={styles.loginLink}

        >
          <Button variant="text" color="#1D5A9B">
            Login
          </Button>        </Link>
      </p>

    </AuthLayout>
  );
}

export default Signup;
