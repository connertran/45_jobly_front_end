import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";
function SignUpForm({ register, userStatus }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (userStatus === true) {
      navigate(`/`);
    }
  }, [userStatus, navigate]);
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  // State to track error, when the user doesn't enter the correct format to the signup form
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
      await register(
        formData.username,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.email
      );
      navigate("/");
    } catch (e) {
      setError(e); // Set error message to state
      console.error(e);
    }
  };

  return (
    <div className="SignUpForm-div">
      <h1 className="SignUpForm-heading">Sign Up</h1>
      {error && (
        <>
          <p className="SignUpForm-p" style={{ color: "red" }}>
            Invalid data!
          </p>
          <p className="SignUpForm-p" style={{ color: "red" }}>
            Make sure the data is in the correct format.
          </p>
        </>
      )}
      <form className="SignUpForm-form" onSubmit={handleSubmit}>
        <label className="SignUpForm-label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="SignUpForm-input"
          required
        />

        <label className="SignUpForm-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="SignUpForm-input"
          required
        />

        <label className="SignUpForm-label" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="SignUpForm-input"
          required
        />

        <label className="SignUpForm-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="SignUpForm-input"
          required
        />

        <label className="SignUpForm-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="SignUpForm-input"
          required
        />

        <button className="SignUpForm-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default SignUpForm;
