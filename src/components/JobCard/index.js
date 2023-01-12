import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="job-card-top-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-card-company-logo"
          />
          <div className="job-card-company-name-rating">
            <h1 className="job-card-company-name">{title}</h1>
            <div className="job-card-rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-mid-container">
          <div className="job-card-location-role">
            <div className="job-card-location-container">
              <GoLocation className="job-card-mid-icon" />
              <p className="location-name">{location}</p>
            </div>
            <div className="job-card-location-container">
              <BsBriefcaseFill className="job-card-mid-icon" />
              <p className="location-name">{employmentType}</p>
            </div>
          </div>
          <h1 className="package-text">{packagePerAnnum}</h1>
        </div>
        <hr className="separator" />
        <h1 className="job-card-description">Description</h1>
        <p className="job-card-description-details">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCard
