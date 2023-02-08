import { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Tasky!</h1>
 
        <Link
          to="/login"
          onClick={() => {
            window.location.href = "/login";
          }}>
            <button>Log in</button>
        </Link>

        <Link
          to="/signin"
          onClick={() => {
            window.location.href = "/signin";
          }}>
            <button>Sign in</button>
        </Link>
        
      </div>
    );
  }
}
export default Welcome;
