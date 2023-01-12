import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp, IoBagRemoveSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobItem = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob

  return (
    <li className="similar-job-container">
      <div className="current-job-top-container">
        <img
          alt="similar job company logo"
          src={companyLogoUrl}
          className="current-job-logo"
        />
        <div className="current-job-company-name-rating">
          <h1 className="current-job-company-name">{title}</h1>
          <div className="current-job-rating-container">
            <AiFillStar className="current-job-star-icon" />
            <p className="current-job-rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="current-job-card-description">Description</h1>
      <p className="current-job-card-description-details">{jobDescription}</p>
      <div className="current-job-card-mid-container">
        <div className="current-job-card-location-role">
          <div className="current-job-card-location-container">
            <IoLocationSharp className="current-job-card-mid-icon" />
            <p className="current-location-name">{location}</p>
          </div>
          <div className="current-job-card-location-container">
            <IoBagRemoveSharp className="current-job-card-mid-icon" />
            <p className="current-location-name">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
