const Topbar = () => {

  const loggedInUser =
    localStorage.getItem("userName") || "Gopal";

  return (

    <div className="bg-white rounded-2xl shadow-soft p-5 flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold text-primary">

          Welcome {loggedInUser} 👋

        </h2>

        <p className="text-gray-500 mt-1">

          Find your dream teaching job today

        </p>

      </div>

    </div>
  );
};

export default Topbar;