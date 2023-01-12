import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <div className="nav-tabs-container">
          <ul className="header-icons-container">
            <li className="header-icon-item">
              <Link to="/" className="header-icon-link">
                <AiFillHome className="header-icon" />
              </Link>
            </li>
            <li className="header-icon-item">
              <Link to="/jobs" className="header-icon-link">
                <BsBriefcaseFill className="header-icon" />
              </Link>
            </li>
            <li className="header-icon-item">
              <button
                type="button"
                onClick={onClickLogout}
                className="logout-btn-icon-container"
              >
                <FiLogOut className="header-icon" />
              </button>
            </li>
          </ul>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
