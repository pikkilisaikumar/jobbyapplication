import Cookies from 'js-cookie'

import {Redirect, Link} from 'react-router-dom'

import Headers from '../Headers'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="overallbackground-home-component">
      <Headers />
      <div className="containerfindjob">
        <h1 className="findthejob-heading">Find The Job That Fits Your Life</h1>
        <p className="paragraphfittingjob">
          Millions of people are searching for jobs,salary information, company
          reviews, Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="link-jobs">
          <button type="button" className="btn btn-primary findjobtbtn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
