import "./CompanyCard.css";
import { useNavigate } from "react-router-dom";
function CompanyCard({ name, description, compHandle }) {
  const navigate = useNavigate();
  const goToCompJobsPage = () => {
    navigate(`/companies/${compHandle}`);
  };
  return (
    <div className="CompanyCard-div" onClick={goToCompJobsPage}>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
export default CompanyCard;
