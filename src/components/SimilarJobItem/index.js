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
    <li>
      <div>
        <img alt="similar job company logo" src={companyLogoUrl} />
        <div>
          <h1>{title}</h1>
          <div>
            <AiFillStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <IoLocationSharp />
          <p>{location}</p>
        </div>

        <div>
          <IoBagRemoveSharp />
          <p>{employmentType}</p>
        </div>
      </div>
      <hr />
      <h1>Description</h1>
      <p>{jobDescription}</p>
    </li>
  )
}

export default SimilarJobItem
