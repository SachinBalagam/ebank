import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
// import Login from '../Login/index'
import './index.css'

class Home extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-container">
        <div className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
            alt="website logo"
          />
          <button
            type="button"
            className="logout-button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="card-container">
          <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}

export default Home
