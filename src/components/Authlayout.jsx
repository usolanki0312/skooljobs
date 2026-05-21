function AuthLayout({ children, title, subtitle, activeTab = 'candidate', onTabChange }) {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-4 sm:p-8 font-body">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Left Side */}
        <div className="bg-hero-gradient rounded-[30px] p-6 sm:p-10 text-white shadow-soft flex flex-col justify-between">
          <div>
            <p className="uppercase tracking-[3px] text-xs font-bold text-white/90">
              SkoolJobs Access
            </p>

            <h1 className="text-[38px] font-bold mt-4 leading-tight font-heading">
              {title}
            </h1>

            <p className="mt-4 text-[17px] leading-relaxed text-white/90">
              {activeTab === 'candidate'
                ? "Build your profile and discover roles that fit your subject and experience."
                : "Post jobs, manage applications, and find the best educators for your school."}
            </p>

            {/* Toggle */}
            {onTabChange && (
              <div className="border border-white/40 mt-10 rounded-full p-[2px] flex items-center bg-white/5 backdrop-blur-sm">
                <button 
                  onClick={() => onTabChange('candidate')}
                  className={`flex-1 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    activeTab === 'candidate' 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Teacher
                </button>
                <button 
                  onClick={() => onTabChange('employer')}
                  className={`flex-1 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    activeTab === 'employer' 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  School
                </button>
              </div>
            )}

            {/* Info Box */}
            <div className="border border-white/30 mt-8 rounded-[24px] p-6 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {activeTab === 'candidate' ? (
                    <>
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 8C20.1046 8 21 8.89543 21 10C21 11.1046 20.1046 12 19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21C21 19.3431 20.3284 17.8431 19.2426 16.7574" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                  ) : (
                    <>
                      <path d="M3 21H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 7H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 15H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                  )}
                </svg>
                <h2 className="text-xl font-bold font-heading">
                  {activeTab === 'candidate' ? "Teachers" : "Schools"}
                </h2>
              </div>

              <p className="mt-2 text-[15px] text-white/80 pl-[44px]">
                {activeTab === 'candidate' ? "Dedicated workspace for educators" : "Streamlined hiring for schools & institutions"}
              </p>

              <ul className="mt-6 space-y-4 text-[15px] text-white/90">
                {activeTab === 'candidate' ? (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                      Create a teaching-first profile
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                      Track applications and interview status
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                      Build resumes tailored to school hiring
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                      Post and manage job listings
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                      Access verified teacher profiles
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full shrink-0"></span>
                      Streamline your interview process
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Side Info / Stats */}
          <div className="mt-8 border-t border-white/20 pt-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white font-heading">10k+</p>
                <p className="text-[11px] text-white/70 uppercase tracking-wider mt-1">Teachers</p>
              </div>
              <div className="border-x border-white/20">
                <p className="text-2xl font-bold text-white font-heading">500+</p>
                <p className="text-[11px] text-white/70 uppercase tracking-wider mt-1">Schools</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-heading">98%</p>
                <p className="text-[11px] text-white/70 uppercase tracking-wider mt-1">Placement</p>
              </div>
            </div>
            <p className="text-center text-xs text-white/60 mt-6 tracking-wide font-medium">
              Designed with ❤️ for Indian Educators
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-[30px] p-6 sm:p-10 shadow-soft flex flex-col justify-center">
          {children}
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;