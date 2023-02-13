import { Component } from "react";
import { Link } from "react-router-dom";


class Contact extends Component {
    render() {
        return (
          <div>
        
            <h2>Contact</h2>
            <p>
              If you want to contact us or have any cuestions
              please call on number:
              111 11 111 
              or email us on: 
              Tasky@tasky.com
            </p>
            <Link
              to="/home"
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              <button type="submit">Back</button>
            </Link>
          </div>
        );
      }
    }
export default Contact; 
