import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Headers = props => {
  const onLogBtnClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="headersnavcontainer">
      <nav>
        <li className="homejobcontainer">
          <Link to="/" className="link-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websitestyling"
            />
          </Link>
        </li>
      </nav>
      <ul className="homejobcontainer">
        <Link to="/" className="link-item">
          <li className="home-list-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="home-list-item">Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onLogBtnClicked}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Headers)
