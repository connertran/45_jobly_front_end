import { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import "./List.css";
import JobCard from "./JobCard";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";
function List({ category, userStatus, username }) {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (userStatus !== true) {
      navigate(`/`);
    }
    async function fetchData() {
      try {
        let result = await JoblyApi.request(category.toLowerCase());
        setData(result);
        // Reset no results state when fetching new data
        setNoResults(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, [category, userStatus, navigate]);
  if (!data) return <div>Loading...</div>;
  const items =
    category.toLowerCase() === "companies" ? data.companies : data.jobs;
  if (!items) return <div>No {category} found</div>;
  async function searchAllCompsByName(searchTerm) {
    try {
      let companies = await JoblyApi.getCompanies(searchTerm);
      if (companies.companies.length === 0) {
        setNoResults(true);
        setData({ companies: [] }); // Clear current data if no companies found
      } else {
        setData({ companies: companies.companies });
        setNoResults(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  async function searchAllJobsByTitle(searchTerm) {
    try {
      let jobs = await JoblyApi.getJobs(searchTerm);
      if (jobs.jobs.length === 0) {
        setNoResults(true);
        setData({ jobs: [] }); // Clear current data if no jobs found
      } else {
        setData({ jobs: jobs.jobs });
        setNoResults(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  return (
    <div className="List-div">
      <h1 className="List-heading">{category} list</h1>
      {category.toLowerCase() === "companies" ? (
        <SearchBox searchCompanies={searchAllCompsByName} />
      ) : (
        <SearchBox searchJobs={searchAllJobsByTitle} />
      )}

      {noResults && <div>Can't find what you are looking for.</div>}
      <div className="List-ul-div">
        <ul className="List-ul">
          {items.map((item) => (
            <li
              key={
                category.toLowerCase() === "companies" ? item.handle : item.id
              }
            >
              {category.toLowerCase() === "companies" ? (
                <CompanyCard
                  name={item.name}
                  description={item.description}
                  compHandle={item.handle}
                />
              ) : (
                <JobCard
                  username={username}
                  title={item.title}
                  companyName={item.companyName}
                  salary={item.salary}
                  equity={item.equity}
                  id={item.id}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default List;
