import { useState } from "react";
import AuthLayout from "../components/Authlayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    
    // Go directly to dashboard
    navigate("/dashboard");
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
        <p className="uppercase tracking-[2px] text-secondary text-[11px] font-bold">
          {step === "otp" 
            ? "Account Verification" 
            : "Create Your Profile"}
        </p>

        <div className="flex items-end justify-between mt-2">
          <h1 className="text-2xl font-bold text-primary font-heading leading-tight sm:text-[28px]">
            {step === "otp" 
              ? "OTP Verification" 
              : "Sign up as the Teacher's"}
          </h1>
        </div>
      </div>

      {/* Screen Form Content Area */}
      <div className="mt-8">
        
        {/* Screen 1: Details Form */}
        {step === "details" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <AuthInput
              label="First Name *"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Aman"
              colSpan="col-span-2"
            />

            <AuthInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Sharma"
              colSpan="col-span-2"
            />

            <AuthInput
              label="Email Address *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="teacher@skooljobs.in"
              colSpan="col-span-2"
            />

            <AuthInput
              label="Phone Number *"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              colSpan="col-span-2"
            />

            <div className="pt-2">
              <AuthButton type="submit">
                Send OTP Verification Code <span>→</span>
              </AuthButton>
            </div>
          </form>
        )}

        {/* Screen 2: OTP Verification (Details are hidden!) */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#f0f5fc] p-4 rounded-2xl border border-primary/10 text-xs text-primary font-semibold leading-relaxed">
              ℹ️ We have sent a verification code to <strong>{formData.phone}</strong> and <strong>{formData.email}</strong>.
              <div className="mt-2 text-[#137333] font-bold">
                For demo verification, please use code: <strong>123456</strong>
              </div>
            </div>

            <AuthInput
              label="Enter 6-Digit OTP *"
              name="otp"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              placeholder="123456"
              colSpan="col-span-2"
            />

            {/* Downsized buttons side by side */}
            <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="bg-light border border-borderColor hover:bg-slate-100 text-secondary font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
              >
                ← Back
              </button>
              
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                Verify OTP <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* Screen 3: Password Page (Basic Details reappear as greyed out / disabled) */}
        {step === "password" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="bg-[#e6f4ea] p-4 rounded-2xl border border-[#137333]/15 text-xs text-[#137333] font-extrabold flex items-center gap-1.5 leading-relaxed mb-2">
              <svg className="w-5 h-5 shrink-0 text-[#137333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Mobile & Email verified successfully via OTP!
            </div>

            {/* Reappearing Disabled Fields */}
            <div className="space-y-4 border-b border-borderColor/60 pb-5 mb-5">
              <AuthInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                colSpan="col-span-2"
                disabled={true}
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
            <AuthInput
              label="Create Password *"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              colSpan="col-span-2"
            />

            <AuthInput
              label="Save Password *"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              colSpan="col-span-2"
            />

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2.5 mt-5 mb-3 cursor-pointer group select-none">
              <input 
                type="checkbox" 
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                className="w-[18px] h-[18px] accent-primary rounded border-borderColor cursor-pointer" 
              />
              <label htmlFor="terms" className="text-[13.5px] text-secondary font-medium cursor-pointer group-hover:text-primary transition-colors">
                I agree to the <span className="text-primary font-bold hover:underline">Terms of Service</span> & <span className="text-primary font-bold hover:underline">Privacy Policy</span>
              </label>
            </div>

            <div className="pt-2">
              <AuthButton type="submit">
                Create account <span>→</span>
              </AuthButton>
            </div>
          </form>
        )}

      </div>

      <p className="mt-6 text-[13px] text-secondary">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-primary font-bold hover:underline"
        >
          Login here
        </Link>
      </p>

    </AuthLayout>
  );
}

export default Signup;
