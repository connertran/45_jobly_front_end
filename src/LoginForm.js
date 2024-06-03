import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
function LoginForm({ login, userStatus }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (userStatus === true) {
      navigate(`/`);
    }
  }, [userStatus, navigate]);
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  // State to track error, when the user doesn't enter the correct info to login form
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate("/");
    } catch (e) {
      setError(e); // Set error message to state
      console.error(e);
    }
  };

  return (
    <div className="LoginForm-div">
      <h1 className="LoginForm-heading">Log In</h1>
      {error && (
        <p className="LoginForm-p" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <form className="LoginForm-form" onSubmit={handleSubmit}>
        <label className="LoginForm-label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="LoginForm-input"
          required
        />

        <label className="LoginForm-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="LoginForm-input"
          required
        />
        <button className="LoginForm-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default LoginForm;
