import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCards = props => {
  const {each} = props
  const {
    companylogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each
  return (
    <Link to={`/jobs/${id}`} className="linkjobseachone">
      <li className="list-item-job">
        <div>
          <div className="compnayimagetitlerating-container">
            <img
              src={companylogoUrl}
              alt="company logo"
              className="companyimage"
            />
            <div className="title-star-container">
              <h1 className="title-heading">{title}</h1>
              <div className="star-container">
                <AiFillStar className="fillstarstyling" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="golocapacakgeemploymenttype">
            <div className="card-container-one">
              <div className="golocation-container">
                <GoLocation />
                <p className="location-emplyparagraph">{location}</p>
              </div>
              <div className="golocation-container">
                <BsFillBriefcaseFill />
                <p className="location-emplyparagraph">{employmentType}</p>
              </div>
            </div>
            <p className="pacakgeanum">{packagePerAnnum}</p>
          </div>
          <hr className="hrline" />
          <h1 className="descriptionheading">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCards
