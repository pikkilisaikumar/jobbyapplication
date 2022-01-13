import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isTrue: false, errorMsg: ''}

  onUserNamechange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordchange = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorData => {
    this.setState({isTrue: true, errorMsg: errorData})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userData = {
      username,
      password,
    }
    const methodata = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, methodata)
    const jsonData = await response.json()
    if (response.ok === true) {
      this.loginSuccess(jsonData.jwt_token)
    } else {
      this.loginFailure(jsonData.error_msg)
    }
  }

  render() {
    const {isTrue, username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="background-details">
        <div className="logincontainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websitestyling"
          />
          <form onSubmit={this.onFormSubmit}>
            <div className="mt-2 mb-3">
              <label htmlFor="textinput">USERNAME</label>
              <br />
              <input
                type="text"
                value={username}
                id="textinput"
                onChange={this.onUserNamechange}
                placeholder="Username"
                className="form-control inputelement"
              />
            </div>
            <div className="mt-2 mb-3">
              <label htmlFor="passwordinput">PASSWORD</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={this.onPasswordchange}
                id="passwordinput"
                placeholder="Password"
                className="form-control inputelement"
              />
            </div>
            <div className="loginbutton">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            {isTrue && <p className="erromsageparagraph">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
