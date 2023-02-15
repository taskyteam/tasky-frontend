import { Component } from "react"
import { 
   getLoginToken,
   createAccount } from "../services/tasks";

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      username:"",
      passwordretype:"",
      error: null
    }
  }

  handleInputFieldChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  async handleCreateUser() {
        localStorage.removeItem("TASKY_TOKEN")
    const { username, email, password, passwordretype } = this.state;
    const { history } = this.props;
    try {
      if (password !== passwordretype) {
        throw new Error("Passwords do not match")
      }

      const newAccount = await createAccount(username, email, password);
      console.log({newAccount})
      const { token, error } = await getLoginToken(email, password);
      if (error) {
        throw new Error(error)
      }

      if(!token) {
        throw new Error("Something went wrong. Couldn't get token")
      }

      localStorage.setItem("TASKY_TOKEN", token);
      history.replace("/create-or-join");  

      
    } catch(error) {
      this.setState({
        error
      });
      console.log(error)
    }

  }


  

  render() {
    const { error, email, password, username, passwordretype } = this.state;
    return (
      <div className="pageContainer primary-main">
        <h1 className="primary-title">Create account</h1>
        <div className="inputBox">
          <label>
            <input
            id="email-field"
            type="email"
            placeholder="Enter your email"
            onChange={this.handleInputFieldChange.bind(this, "email")}
            value={email}
            autoComplete="off"
            />
          </label>
          <label>
            <input
            type="password"
            placeholder="Enter your password"
            onChange={this.handleInputFieldChange.bind(this, "password")}
            value={password}
            />
          </label>
          <label>
            <input
            type="password"
            placeholder="Retype your password"
            onChange={this.handleInputFieldChange.bind(this, "passwordretype")}
            value={passwordretype}
            />
          </label>
          <label>
            <input
            id="username-field"
            type="text"
            placeholder="Enter your username"
            onChange={this.handleInputFieldChange.bind(this, "username")}
            value={username}
            />
          </label>
        
        <div>
          <button className="btn-primary"
          onClick={this.handleCreateUser.bind(this)}>Create Account</button>
        </div>

        {error && (
          <div>{error.message} </div>
        )}
      </div>
      </div>
    );
  }

}

export default CreateAccount;