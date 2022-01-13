import {Component} from 'react'

import Cookies from 'js-cookie'
import {GiClick} from 'react-icons/gi'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Headers from '../Headers'
import SimilarJob from '../SimilarJob'
import Skill from '../Skill'
import './index.css'

const apiCallChange = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobinformation: [],
    skills: [],
    lifecompanyOne: {},
    similarJobs: [],
    apiStatus: apiCallChange.initial,
  }

  componentDidMount() {
    this.jobDetails()
  }

  retryBtnClicked = () => {
    this.jobDetails()
  }

  jobDetails = async () => {
    const {match} = this.props
    this.setState({apiStatus: apiCallChange.loading})
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const method = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, method)
    if (response.ok === true) {
      const jsondata = await response.json()
      const data = {
        jobDetails: jsondata.job_details,
        similarJobs: jsondata.similar_jobs,
      }
      const {jobDetails, similarJobs} = data
      const jobrelatedDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }

      const {lifeAtCompany, skills} = jobrelatedDetails
      // console.log(jobrelatedDetails)
      const lifecompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      const skillsData = skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const similarjobsList = similarJobs.map(eachOne => ({
        companyLogoUrl: eachOne.company_logo_url,
        employmentType: eachOne.employment_type,
        id: eachOne.id,
        jobDescription: eachOne.job_description,
        location: eachOne.location,
        rating: eachOne.rating,
        title: eachOne.title,
      }))

      this.setState({
        jobinformation: jobrelatedDetails,
        skills: skillsData,
        lifecompanyOne: lifecompany,
        similarJobs: similarjobsList,
        apiStatus: apiCallChange.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiCallChange.failure})
    }
  }

  render() {
    const {
      apiStatus,
      jobinformation,
      skills,
      lifecompanyOne,
      similarJobs,
    } = this.state

    // console.log(apiStatus)

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobinformation

    const {description, imageUrl} = lifecompanyOne

    let apistatusdata

    if (apiStatus === apiCallChange.success) {
      apistatusdata = (
        <div className="job-item-details-container">
          <div className="container-box">
            <div className="coompnaylogo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="companylogostyling"
              />
              <div className="title-filling-container">
                <h1 className="title-headingone">{title}</h1>
                <div className="rating-filling-styling">
                  <AiFillStar className="fillstarstyling" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="container-location-employment">
              <div className="location-element-type-container">
                <div className="location-container">
                  <GoLocation />
                  <p className="location-paragraph">{location}</p>
                </div>
                <div className="location-container">
                  <BsFillBriefcaseFill />
                  <p className="location-paragraph">{employmentType}</p>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr className="hr-line-styling" />
            <div className="description-container">
              <h1 className="descriptioheading">Description</h1>
              <button type="button" className="companyWebsitebutton">
                <a href={companyWebsiteUrl}>
                  Visit <GiClick />
                </a>
              </button>
            </div>
            <p className="job-description-paragraph">{jobDescription}</p>
            <h1 className="descriptioheading">Skills</h1>
            <ul className="unorderlistone-skill">
              {skills.map(each => (
                <Skill each={each} key={each.name} />
              ))}
            </ul>
            <h1 className="descriptioheading">Life at Company</h1>
            <div className="job-descriptioncontainer">
              <p className="job-description-paragraph">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="descriptionpimageUrl"
              />
            </div>
          </div>
          <h1 className="descriptioheading">Similar Jobs</h1>
          <ul className="unorderlisteachjob">
            {similarJobs.map(eachJob => (
              <SimilarJob key={eachJob.id} eachJob={eachJob} />
            ))}
          </ul>
        </div>
      )
    } else if (apiStatus === apiCallChange.failure) {
      apistatusdata = (
        <div className="job-item-details-container2">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-image-styling"
          />
          <h1 className="oops-something-heading">Oops! Something Went Wrong</h1>
          <p className="oops-we-connot-paragraph">
            We cannot seem to find the page you are looking for
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.retryBtnClicked}
          >
            Retry
          </button>
        </div>
      )
    } else if (apiStatus === apiCallChange.loading) {
      apistatusdata = (
        <div className="job-item-details-container1">
          <div className="loader-container" testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      )
    }

    return (
      <>
        <Headers />
        {apistatusdata}
      </>
    )
  }
}
export default JobItemDetails
