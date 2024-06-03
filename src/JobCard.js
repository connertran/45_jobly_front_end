import "./JobCard.css";
import JoblyApi from "./api";
import { useEffect, useState } from "react";

function JobCard({ title, companyName, salary, equity, id, username }) {
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    async function fetchDataForApplications() {
      try {
        let res = await JoblyApi.getCurrentUser(username);

        if (res.applications.includes(id)) {
          setHasApplied(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchDataForApplications();
  }, [username, id]);

  const handleApply = () => {
    try {
      JoblyApi.applyToJob(username, id);

      setHasApplied(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="JobCard-div">
      <p>{title}</p>
      <p>{companyName}</p>
      <p>Salary: {salary}</p>
      <p>Equity: {equity === null ? 0 : equity}</p>
      <button
        className="JobCard-button"
        onClick={hasApplied ? null : handleApply}
        disabled={hasApplied}
      >
        {hasApplied ? "APPLIED" : "APPLY"}
      </button>
    </div>
  );
}
export default JobCard;
