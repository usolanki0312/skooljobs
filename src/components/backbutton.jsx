import { useNavigate } from "react-router-dom";

const BackButton = () => {

  const navigate = useNavigate();

  return (

    <button
      type="button"
      onClick={() => navigate(-1)}
      className="bg-primary text-white px-5 py-3 rounded-xl hover:bg-secondary transition"
    >
      ← Back
    </button>

  );
};

export default BackButton;
