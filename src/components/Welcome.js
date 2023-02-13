import { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="welcome-main">
        <h1 className="welcome-title">Welcome to Tasky!</h1>
 
        <Link
          to="/login"
          onClick={() => {
            window.location.href = "/login";
          }}>
            <button className="welcome-login-btn">Log in</button>
        </Link>

        <Link
          to="/signin"
          onClick={() => {
            window.location.href = "/signin";
          }}>
            <button className="welcome-signin-btn">Sign in</button>
        </Link>
        </div>
      </div>
    );
  }
}
export default Welcome;
