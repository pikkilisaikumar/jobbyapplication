import './index.css'
import Headers from '../Headers'

const NotFound = () => (
  <>
    <Headers />
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="pagenotfoundheading">Page Not Found</h1>
      <p className="not-found-paragraph">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
