import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showError: false, errorMsg: ''}

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="main-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="logo"
            />
          </div>
          <div className="right-container">
            <h1 className="heading">Welcome Back!</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                className="input"
                placeholder="Enter User ID"
                onChange={this.onChangeUserID}
                value={userId}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                className="input"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
                value={pin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            {showError && <p className="error">{errorMsg}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
