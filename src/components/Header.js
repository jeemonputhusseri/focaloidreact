
import {
    Link
  } from "react-router-dom";

export default function Header(props) {
    return <nav className="nav">
      <ul className="navul">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/myaccount">My Account</Link>
        </li>
        <li>
          <Link to="/moviessearch">Movies Search</Link>
        </li>
        <li>
          <Link to="/mymovies">My Movies</Link>
        </li>
        <li>
          <span>Logged in: <strong>{localStorage.getItem('fullname')}</strong></span>
        </li>
      </ul>
      {props.standalone ? <div className="headerWelcome"><h2>Welcome! You are logged in!</h2></div> : ''}
    </nav>
  }