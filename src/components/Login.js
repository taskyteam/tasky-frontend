import { Component } from "react"
import { getLoginToken } from "../services/tasks";
import loginImage from "../images/login.svg"

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

  async componentDidMount(){
    localStorage.removeItem("TASKY_TOKEN")
  }

  render() {
    const { error, email, password } = this.state;
    return (
      <div className="pageContainer primary-main">
        <div className="illustration">
        <img src={loginImage} alt="login"/>
        </div>
        <h1 className="primary-title">Login</h1>
        <div className="inputBox">
            <input
            placeholder="Email"
            id="email-field"
            type="email"
            onChange={this.handleInputFieldChange.bind(this, "email")}
            value={email}
            autoComplete="off"
            />
          <br />
            <input
            placeholder="Password"
            type="password"
            onChange={this.handleInputFieldChange.bind(this, "password")}
            value={password}
            />
          <div>
            <button style={{marginTop: "2rem"}} className="btn-primary "
            onClick={this.handleLoginAttempt.bind(this)}>Log in</button>
          </div>
          {error && (
            <div>Error: {error.message} </div>
          )}
        </div>
      </div>
      
    );
  }

}

export default Login;