import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
function NavBar({ userStatus, logout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
  };
  return (
    <div className="NavBar-div">
      <Link className="NavBar-logo" to="/">
        Jobly
      </Link>
      {userStatus !== true ? (
        <div className="NavBar-link-div">
          <Link className="NavBar-link" to="/login">
            Login
          </Link>
          <Link className="NavBar-link" to="/signup">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="NavBar-link-div">
          <Link className="NavBar-link" to="/companies">
            Companies
          </Link>
          <Link className="NavBar-link" to="/jobs">
            Jobs
          </Link>
          <Link className="NavBar-link" to="/profile">
            Profile
          </Link>
          <Link className="NavBar-link" to="/" onClick={handleLogout}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
}
export default NavBar;
