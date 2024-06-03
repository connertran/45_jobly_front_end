import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import "./CompJobs.css";
function CompJobs({ userStatus, username }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  let company = useParams();
  let companyHandleFromURL = company.name;
  useEffect(() => {
    if (userStatus !== true) {
      navigate(`/`);
    }
    async function fetchData() {
      try {
        let result = await JoblyApi.getCompany(companyHandleFromURL);
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/NotFoundPage");
      }
    }
    fetchData();
  }, [company, companyHandleFromURL, navigate, userStatus]);
  if (!data) return <div>Loading...</div>;
  return (
    <div className="CompJobs-div">
      <h1 className="CompJobs-heading">{data.name}</h1>
      <p>{data.description}</p>
      <div className="CompJobs-ul-div">
        <ul>
          {data.jobs.map((job) => (
            <li key={job.id}>
              {
                <JobCard
                  title={job.title}
                  salary={job.salary}
                  equity={job.equity}
                  username={username}
                  id={job.id}
                />
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default CompJobs;
