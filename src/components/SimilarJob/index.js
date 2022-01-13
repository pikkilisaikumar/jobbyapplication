import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {eachJob} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob

  return (
    <li className="list-item-similar-job">
      <div className="title-company-rating-auto-fill">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="titlecompanyLogoone"
        />
        <div>
          <h1 className="titleheading-similar-jobs">{title}</h1>
          <div className="star-rating-container">
            <AiFillStar className="fillstar" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="descriptionheading">Description</h1>
      <p className="job-description-related">{jobDescription}</p>
      <div className="locationemploymenttype">
        <div className="location-container-one">
          <GoLocation className="react-icons" />
          <p className="location-emply-paragraph">{location}</p>
        </div>
        <div className="location-container-one">
          <BsFillBriefcaseFill className="react-icons" />
          <p className="location-emply-paragraph">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
