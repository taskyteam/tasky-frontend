import { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="primary-main">
        <h1>Welcome to Tasky!</h1>
 
        <Link
          to="/login"
          onClick={() => {
            window.location.href = "/login";
          }}>
            <button className="btn-primary login-btn">Log in</button>
        </Link>
        <Link
          to="/create-account"
          onClick={() => {
            window.location.href = "/create-account";
          }}>
            <button className="btn-primary">Sign up</button>
        </Link>
        </div>
      </div>
    );
  }
}
export default Welcome;
