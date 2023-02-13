import { Component } from "react"
import { 
 // getLoginToken,
   createAccount } from "../services/tasks";

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      username:"",
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
    const {username, email, password  } = this.state;

    try {
      const newAccount = await createAccount(username, email, password);
      console.log({newAccount})
    } catch(error) {
      this.setState({
        error
      });
      console.log(error)
    }
  }


  // async handleLoginAttempt() {
  //   const { email, password } = this.state;
  //   const { history } = this.props;

  //   try {
  //     const { token, error } = await getLoginToken(email, password);

  //     if (error) {
  //       throw new Error(error)
  //     }

  //     if(!token) {
  //       throw new Error("Something went wrong. Couldn't get token")
  //     }

  //     localStorage.setItem("TASKY_TOKEN", token);

  //     history.replace("/");


  //   } catch(error) {
  //     this.setState({
  //       error
  //     });
  //     console.log(error)
  //   }
  // }

  render() {
    const { error, email, password, username } = this.state;
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
        <label>
          Username:
          <input
          id="username-field"
          type="text"
          onChange={this.handleInputFieldChange.bind(this, "username")}
          value={username}
          />
        </label>
        <div>
          <button
          onClick={this.handleCreateUser.bind(this)}>Log in</button>
        </div>
        {error && (
          <div>Error: {error.message} </div>
        )}
      </div>
      
    );
  }

}

export default CreateAccount;