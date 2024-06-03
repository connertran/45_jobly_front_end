import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import "./ProfileForm.css";
function ProfileForm({ userStatus, currentUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (userStatus !== true) {
      navigate(`/`);
    }
  }, [userStatus, navigate]);
  const initialState = {
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };

  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    JoblyApi.saveProfile(currentUser.username, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
    navigate(`/`);
    // Delayed execution, so it runs after the redirection
    setTimeout(() => {
      alert("We saved your changes!");
    }, 0);
  };

  return (
    <div className="ProfileForm-div">
      <h1 className="ProfileForm-heading">Profile</h1>
      <form className="ProfileForm-form" onSubmit={handleSubmit}>
        <label className="ProfileForm-label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          readOnly
          className="ProfileForm-input-readonly"
          required
        />

        <label className="ProfileForm-label" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="ProfileForm-input"
          required
        />

        <label className="ProfileForm-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="ProfileForm-input"
          required
        />

        <label className="ProfileForm-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="ProfileForm-input"
          required
        />

        <button className="ProfileForm-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default ProfileForm;
