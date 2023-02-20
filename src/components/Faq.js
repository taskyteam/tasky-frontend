import { Component } from "react";
import { Link } from "react-router-dom";


class FAQ extends Component {
  render() {
    return (
      <div>
    
        <h2>FAQ</h2>
        <p>
          Velkommen til Tasky! Appen som kan være med å gjøre hverdagsoppgaver
          til en gøy aktivitet for alle parter!
        </p>
        <Link
          to="/"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <button 
          className="btn-primary"
          type="submit">Back</button>
        </Link>
      </div>
    );
  }
}

export default FAQ;
