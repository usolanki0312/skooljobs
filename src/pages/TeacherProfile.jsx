import { useState } from "react";
import BackButton from "../components/backbutton";
const TeacherProfile = () => {

  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150"
  );

  const [teacherData, setTeacherData] = useState({
    title: "Mr",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    age: "",
    nationality: "",
    currentJob: "",
    mainSubject: "",
    additionalSubject: "",
    classesTaught: "",
    language: "",
    status: "",
    qualification: "",
    experience: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleDobChange = (e) => {

  const dob = e.target.value;

  const birthDate = new Date(dob);

  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {
    age--;
  }

  setTeacherData({
    ...teacherData,
    dob: dob,
    age: age,
  });
};
  const handleProfileImage = (event) => {

    const file = event.target.files[0];

    if (file) {
      setProfileImage(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(teacherData);

    alert("Profile Saved Successfully");
  };

  return (
    <div className="min-h-screen bg-light p-6">

      <div className="bg-white rounded-2xl shadow-soft p-8">

  <div className="mb-6">
    <BackButton />
  </div>

  {/* TOP */}

        {/* TOP */}

        <div className="flex justify-between items-center mb-10">

          <div className="flex items-center gap-5">

            <div className="flex flex-col items-center">

              <img
                src={profileImage}
                alt="profile"
                className="w-28 h-28 rounded-full border-4 border-primary object-cover"
              />

              <label className="mt-4 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer text-sm">

                Upload Photo

                <input
                  type="file"
                  hidden
                  onChange={handleProfileImage}
                />

              </label>

            </div>

            <div>

              <h1 className="text-4xl font-bold text-primary">
                Teacher Profile
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your profile details
              </p>

            </div>

          </div>

          <p className="text-gray-500">
            Last Login : Today 10:00 AM
          </p>

        </div>

        {/* PROFILE SECTION */}

        <div className="flex gap-6">

          {/* LEFT SIDEBAR */}

          <div className="w-64 bg-light rounded-2xl p-5 h-fit">

            <div className="flex flex-col gap-4">

              <button className="bg-primary text-white p-3 rounded-xl text-left">
                Basic Info
              </button>

              <button className="hover:bg-white p-3 rounded-xl text-left">
                Contact Details
              </button>

              <button className="hover:bg-white p-3 rounded-xl text-left">
                Qualification
              </button>

              <button className="hover:bg-white p-3 rounded-xl text-left">
                Experience
              </button>

              <button className="hover:bg-white p-3 rounded-xl text-left">
                Resume
              </button>

            </div>

          </div>

          {/* RIGHT FORM */}

          <form
            onSubmit={handleSubmit}
            className="flex-1"
          >

        <div className="grid grid-cols-3 gap-6">

  {/* TITLE */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Title
    </label>

    <select
      name="title"
      value={teacherData.title}
      onChange={handleChange}
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    >

      <option value="Mr">
        Mr
      </option>

      <option value="Mrs">
        Mrs
      </option>

      <option value="Miss">
        Miss
      </option>

    </select>
  </div>

  {/* FIRST NAME */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      First Name
    </label>

    <input
      type="text"
      name="firstName"
      value={teacherData.firstName}
      onChange={handleChange}
      placeholder="First Name"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* MIDDLE NAME */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Middle Name
    </label>

    <input
      type="text"
      name="middleName"
      value={teacherData.middleName}
      onChange={handleChange}
      placeholder="Middle Name"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* LAST NAME */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Last Name
    </label>

    <input
      type="text"
      name="lastName"
      value={teacherData.lastName}
      onChange={handleChange}
      placeholder="Last Name"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* DOB */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      DOB
    </label>

  <input
  type="date"
  name="dob"
  value={teacherData.dob}
  onChange={handleDobChange}
  className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
/>
  </div>

  {/* AGE */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Age
    </label>
<input
  type="number"
  name="age"
  value={teacherData.age}
  readOnly
  placeholder="Age"
  className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
/>  
  </div>

  {/* NATIONALITY */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Nationality
    </label>

    <input
      type="text"
      name="nationality"
      value={teacherData.nationality}
      onChange={handleChange}
      placeholder="Nationality"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* CURRENT JOB */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Current Job Title
    </label>

    <input
      type="text"
      name="currentJob"
      value={teacherData.currentJob}
      onChange={handleChange}
      placeholder="Frontend Developer"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* MAIN SUBJECT */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Main Subject
    </label>

    <select
      name="mainSubject"
      value={teacherData.mainSubject}
      onChange={handleChange}
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    >

      <option value="">
        Select Subject
      </option>

      <option value="Math">
        Math
      </option>

      <option value="Science">
        Science
      </option>

      <option value="English">
        English
      </option>

      <option value="Computer">
        Computer
      </option>

    </select>
  </div>

  {/* ADDITIONAL SUBJECT */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Additional Subject
    </label>

    <input
      type="text"
      name="additionalSubject"
      value={teacherData.additionalSubject}
      onChange={handleChange}
      placeholder="History"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* CLASSES */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Classes Taught
    </label>

    <select
      name="classesTaught"
      value={teacherData.classesTaught}
      onChange={handleChange}
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    >

      <option value="">
        Select Class
      </option>

      <option value="Class 1">
        Class 1
      </option>

      <option value="Class 2">
        Class 2
      </option>

      <option value="Class 3">
        Class 3
      </option>

      <option value="Class 4">
        Class 4
      </option>

    </select>
  </div>

  {/* LANGUAGE */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Language
    </label>

    <select
      name="language"
      value={teacherData.language}
      onChange={handleChange}
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    >

      <option value="">
        Select Language
      </option>

      <option value="English">
        English
      </option>

      <option value="Hindi">
        Hindi
      </option>

      <option value="French">
        French
      </option>

    </select>
  </div>

  {/* STATUS */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Status
    </label>

    <select
      name="status"
      value={teacherData.status}
      onChange={handleChange}
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    >

      <option value="">
        Select Status
      </option>

      <option value="Beginner">
        Beginner
      </option>

      <option value="Intermediate">
        Intermediate
      </option>

      <option value="Expert">
        Expert
      </option>

    </select>
  </div>

  {/* QUALIFICATION */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Qualification
    </label>

    <input
      type="text"
      name="qualification"
      value={teacherData.qualification}
      onChange={handleChange}
      placeholder="MCA"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* EXPERIENCE */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Experience
    </label>

    <input
      type="text"
      name="experience"
      value={teacherData.experience}
      onChange={handleChange}
      placeholder="5 Years"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* EMAIL */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Email
    </label>

    <input
      type="email"
      name="email"
      value={teacherData.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

  {/* PHONE */}

  <div>
    <label className="block mb-2 font-semibold text-primary">
      Phone Number
    </label>

    <input
      type="text"
      name="phone"
      value={teacherData.phone}
      onChange={handleChange}
      placeholder="Phone Number"
      className="w-full border border-borderColor bg-light p-3 rounded-xl outline-none"
    />
  </div>

</div>

            <button
              type="submit"
              className="mt-10 bg-primary text-white px-8 py-3 rounded-xl hover:bg-secondary transition"
            >
              Save Profile
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default TeacherProfile;