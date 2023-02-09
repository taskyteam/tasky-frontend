import { Component } from "react"

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      password:"",
      error: null
    }
  }

  handleInputFieldChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    const { error, username, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <label>
          Email:
          <input
          type="email"
          onChange={this.handleInputFieldChange.bind(this, "username")}
          value={username}
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
          onClick={() => {return}}>Log in</button>
        </div>
        {error && (
          <div>Error: {error.message} </div>
        )}
      </div>
      
    );
  }

}

export default Login;