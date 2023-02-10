import { Component } from "react"
import { getLoginToken } from "../services/tasks";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      error: null
    }
  }

  handleInputFieldChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }


  async handleLoginAttempt() {
    const { email, password } = this.state;
    const { history } = this.props;

    try {
      const { token, error } = await getLoginToken(email, password);

      if (error) {
        throw new Error(error)
      }

      if(!token) {
        throw new Error("Something went wrong. Couldn't get token")
      }

      localStorage.setItem("TASKY_TOKEN", token);

      history.replace("/");


    } catch(error) {
      this.setState({
        error
      });
      console.log(error)
    }
  }

  render() {
    const { error, email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <label>
          Email:
          <input
          id="email-field"
          type="email"
          onChange={this.handleInputFieldChange.bind(this, "email")}
          value={email}
          />
        </label>
        <br />
        <label>
          Password:
          <input
          type="password"
          onChange={this.handleInputFieldChange.bind(this, "password")}
          value={password}
          />
        </label>
        <div>
          <button
          onClick={this.handleLoginAttempt.bind(this)}>Log in</button>
        </div>
        {error && (
          <div>Error: {error.message} </div>
        )}
      </div>
      
    );
  }

}

export default Login;