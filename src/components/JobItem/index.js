import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Employment from '../Employment'

import SalaryRange from '../SalaryRange'

import JobCards from '../JobCards'

const apiStatusChange = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobItem extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salaryRange: salaryRangesList[0].salaryRangeId,
    jobsListData: [],
    apiStatusOne: apiStatusChange.intial,
  }

  componentDidMount() {
    this.employessData()
  }

  salaryClickedOne = id => {
    this.setState({salaryRange: id}, this.employessData)
  }

  emplyedmentclicked = id => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, id],
      }),
      this.employessData,
    )
  }

  renderSuccessView = () => {
    const {jobsListData} = this.state
    if (jobsListData.length === 0) {
      return (
        <div className="renderfailureview">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failureimageview"
          />
          <h1 className="oopssomethingwent">No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul>
        {jobsListData.map(each => (
          <JobCards each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onclickretryOne = () => {
    this.employessData()
  }

  renderFailureView = () => (
    <div className="renderfailureview">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureimageview"
      />
      <h1 className="oopssomethingwent">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onclickretryOne}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onchangeSearchinput = event => {
    this.setState({searchInput: event.target.value})
  }

  onclickedSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.employessData)
  }

  employessData = async () => {
    this.setState({apiStatusOne: apiStatusChange.loading})
    const {searchInput, employmentType, salaryRange} = this.state
    const emplyjoin = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${emplyjoin}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const methods = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, methods)
    if (response.ok === true) {
      const jsonData = await response.json()
      //   console.log(jsonData)
      const {jobs} = jsonData
      const jobsList = jobs.map(each => ({
        companylogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsListData: jobsList,
        apiStatusOne: apiStatusChange.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatusOne: apiStatusChange.failure})
    }
  }

  render() {
    const {rahulSirData} = this.props
    const {searchInput, apiStatusOne} = this.state
    // console.log(apiStatusOne)

    let jobsOverall

    switch (apiStatusOne) {
      case apiStatusChange.success:
        jobsOverall = this.renderSuccessView()
        break
      case apiStatusChange.failure:
        jobsOverall = this.renderFailureView()
        break
      case apiStatusChange.loading:
        jobsOverall = this.renderLoadingView()
        break
      default:
        jobsOverall = null
    }

    return (
      <div className="containerOne">
        <div className="left-sidecontainerone">
          {rahulSirData}
          <br />
          <hr className="hrlineone" />
          <h1 className="typeofemplystyling">Type of Employment</h1>
          <ul className="employment-unorderlist">
            {employmentTypesList.map(each => (
              <Employment
                key={each.employmentTypeId}
                each={each}
                emplyedmentclicked={this.emplyedmentclicked}
              />
            ))}
          </ul>
          <hr className="hrlineone" />
          <h1 className="typeofemplystyling">Salary Range</h1>
          <ul className="employment-unorderlist">
            {salaryRangesList.map(eachone => (
              <SalaryRange
                key={eachone.salaryRangeId}
                eachone={eachone}
                salaryClickedOne={this.salaryClickedOne}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className="inputelementiconcontainer">
            <div className="inputelementcontainer">
              <input
                type="search"
                className="form-control searchinput"
                placeholder="Search"
                value={searchInput}
                onChange={this.onchangeSearchinput}
              />
              <button
                type="button"
                testid="searchButton"
                className="searchiconbutton"
                onClick={this.onclickedSearchIcon}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          {jobsOverall}
        </div>
      </div>
    )
  }
}

export default JobItem
