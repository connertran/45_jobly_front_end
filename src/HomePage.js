import { useNavigate } from "react-router-dom";
import "./HomePage.css";
function HomePage({ name = null, userStatus }) {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };
  return (
    <div className="HomePage-div">
      <h1 className="HomePage-heading">Jobly</h1>
      <p>All job in one, convinient place.</p>
      {userStatus && <h2>Welcome back {name}</h2>}

      {!userStatus && (
        <>
          <button
            className="HomePage-button HomePage-login-btn"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="HomePage-button HomePage-signup-btn"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}
export default HomePage;
