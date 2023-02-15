import { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="primary-main">
        <h1 className="primary-title">Welcome to Tasky!</h1>
 
        <Link
          to="/login"
          onClick={() => {
            window.location.href = "/login";
          }}>
            <button className="btn-primary">Log in</button>
        </Link>
        <Link
          to="/signin"
          onClick={() => {
            window.location.href = "/signin";
          }}>
            <button className="btn-primary">Sign in</button>
        </Link>
        </div>
      </div>
    );
  }
}
export default Welcome;
