import React, { useEffect, useState } from "react";

const TeacherProfile = () => {

  const [formData, setFormData] = useState({
    title: "Mr",
    firstName: "",
    middleName: "",
    lastName: "",

    dob: "",
    age: "",

    nationality: "",

    currentJobTitle: "",

    mainSubject: "",

    additionalSubjects: [],

    class1: "",
    class2: "",

    language1: "English",
    language2: "",
    language3: "",

    status1: "Fluency enough to teach",
    status2: "",
    status3: "",

    qualification1: "",
    qualification2: "",
  });

  /* Handle Change */
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  /* Auto Age Calculate */
  useEffect(() => {

    if (formData.dob) {

      const birthDate = new Date(formData.dob);

      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();

      const monthDiff =
        today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setFormData((prev) => ({
        ...prev,
        age: age,
      }));
    }

  }, [formData.dob]);

  /* Submit */
  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    alert("Profile Saved Successfully 🚀");
  };

  return (
    <div className="bg-white rounded-[28px] p-4 sm:p-6 lg:p-8 shadow-sm">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-10">

        <div>

          <h1 className="text-3xl sm:text-5xl font-bold text-blue-900">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Complete your teacher profile details
          </p>

        </div>

        <div className="lg:text-right">

          <p className="text-sm text-gray-500">
            Last login: Today 10:00 AM
          </p>

          <button className="text-blue-900 font-bold mt-2 hover:text-blue-700 transition">
            Logout
          </button>

        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {/* Title */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>

            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Miss</option>
            </select>

          </div>

          {/* First Name */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            />

          </div>

          {/* Middle Name */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Middle Name
            </label>

            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Middle Name"
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            />

          </div>

          {/* Last Name */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            />

          </div>

        </div>

        {/* DOB Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* DOB */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              DOB
            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            />

          </div>

          {/* Age */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>

            <input
              type="text"
              value={formData.age}
              readOnly
              placeholder="Calculated from DOB"
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 bg-gray-100"
            />

            <p className="text-xs text-gray-400 mt-2">
              Auto calculated from DOB
            </p>

          </div>

          {/* Nationality */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nationality
            </label>

            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Nationality"
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            />

          </div>

        </div>

        {/* Current Job */}
        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Job Title
          </label>

          <select
            name="currentJobTitle"
            value={formData.currentJobTitle}
            onChange={handleChange}
            className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
          >

            <option value="">
              Select...
            </option>

            <option>
              PGT Mathematics Teacher
            </option>

            <option>
              TGT Science Teacher
            </option>

            <option>
              English Teacher
            </option>

          </select>

        </div>

        {/* Subject Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Main Subject */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Main Subject
            </label>

            <select
              name="mainSubject"
              value={formData.mainSubject}
              onChange={handleChange}
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            >

              <option value="">
                Select...
              </option>

              <option>
                Mathematics
              </option>

              <option>
                Science
              </option>

              <option>
                English
              </option>

            </select>

            <p className="text-xs text-gray-400 mt-2">
              Only one can be selected
            </p>

          </div>

          {/* Additional Subjects */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Subject(s)
            </label>

            <textarea
              rows="5"
              name="additionalSubjects"
              placeholder="History, Geography, Art, Music"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none resize-none focus:border-blue-700"
            ></textarea>

            <p className="text-xs text-gray-400 mt-2">
              Multiple subjects can be selected
            </p>

          </div>

        </div>

        {/* Classes */}
        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Classes Taught
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <select
              name="class1"
              value={formData.class1}
              onChange={handleChange}
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            >

              <option>Class A</option>
              <option>Class B</option>
              <option>Class C</option>

            </select>

            <select
              name="class2"
              value={formData.class2}
              onChange={handleChange}
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            >

              <option>Class C</option>
              <option>Class D</option>

            </select>

          </div>

        </div>

        {/* Language + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Languages */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Language
            </label>

            <div className="space-y-4">

              <select
                name="language1"
                value={formData.language1}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>

              <select
                name="language2"
                value={formData.language2}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
              >
                <option>Select...</option>
                <option>Hindi</option>
              </select>

              <select
                name="language3"
                value={formData.language3}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
              >
                <option>Select...</option>
                <option>French</option>
              </select>

            </div>

          </div>

          {/* Status */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Status
            </label>

            <div className="space-y-4">

              <select
                name="status1"
                value={formData.status1}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
              >
                <option>
                  Fluency enough to teach
                </option>
              </select>

              <select
                name="status2"
                value={formData.status2}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
              >
                <option>Select...</option>
              </select>

              <select
                name="status3"
                value={formData.status3}
                onChange={handleChange}
                className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
              >
                <option>Select...</option>
              </select>

            </div>

          </div>

        </div>

        {/* Qualification */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Highest Qualification 1
            </label>

            <select
              name="qualification1"
              value={formData.qualification1}
              onChange={handleChange}
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            >

              <option>Select...</option>

              <option>B.Ed</option>

              <option>M.Ed</option>

            </select>

          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Highest Qualification 2
            </label>

            <select
              name="qualification2"
              value={formData.qualification2}
              onChange={handleChange}
              className="w-full h-[55px] border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-700"
            >

              <option>Select...</option>

              <option>M.Sc</option>

              <option>PhD</option>

            </select>

          </div>

        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Save Profile
          </button>

        </div>

      </form>

    </div>
  );
};

export default TeacherProfile;