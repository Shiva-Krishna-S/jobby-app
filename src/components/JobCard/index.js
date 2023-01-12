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
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <div>
              <AiFillStar />
              <p>{rating}</p>
            </div>
          </div>
          <div>
            <div>
              <div>
                <GoLocation />
                <p>{location}</p>
              </div>
              <div>
                <BsBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <h1>{packagePerAnnum}</h1>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
