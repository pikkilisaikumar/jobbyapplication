import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Headers from '../Headers'

import JobItem from '../JobItem'

import './index.css'

const apiStatusChange = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {profileData: {}, apiStatus: apiStatusChange.intial}

  componentDidMount() {
    this.profileData()
  }

  retryOnclickBtn = () => {
    this.profileData()
  }

  profileData = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusChange.loading})
    const apiUrl = `https://apis.ccbp.in/profile`
    const methoddata = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, methoddata)
    if (response.ok === true) {
      const jsonData = await response.json()
      const frontedJson = {
        profileDetails: jsonData.profile_details,
      }
      const {profileDetails} = frontedJson
      const rahulsirData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileData: rahulsirData,
        apiStatus: apiStatusChange.success,
      })
    } else if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusChange.failure,
      })
    }
  }

  renderSuccess = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="rahul-container">
        <img src={profileImageUrl} alt="profile" className="profilestyling" />
        <h1 className="rahulattuluriheading">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="rahul-container1">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailure = () => (
    <div className="rahul-container1">
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.retryOnclickBtn}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    let rahulSirData

    switch (apiStatus) {
      case apiStatusChange.success:
        rahulSirData = this.renderSuccess()
        break
      case apiStatusChange.failure:
        rahulSirData = this.renderFailure()
        break
      case apiStatusChange.loading:
        rahulSirData = this.renderLoading()
        break
      default:
        rahulSirData = null
    }

    return (
      <div className="entirecontainerjobs">
        <Headers />
        <JobItem rahulSirData={rahulSirData} />
      </div>
    )
  }
}

export default Jobs
