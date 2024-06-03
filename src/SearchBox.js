import { useState } from "react";
import "./SearchBox.css";
function SearchBox({ searchCompanies = null, searchJobs = null }) {
  const initialState = {
    searchTerm: "",
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
    if (searchCompanies) {
      searchCompanies(formData.searchTerm);
    } else if (searchJobs) {
      searchJobs(formData.searchTerm);
    }

    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="search-box"
        type="text"
        name="searchTerm"
        placeholder="Enter Search Term..."
        value={formData.searchTerm}
        onChange={handleChange}
        className="SearchBox-input"
        required
      />
      <button className="SearchBox-button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default SearchBox;
