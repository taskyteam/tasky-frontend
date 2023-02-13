import { Component } from "react";
import UserStats from "./UserStats";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getCurrentUser } from "../services/tasks";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      household_tasks: [],
      household_users: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("TASKY_TOKEN");
    if(!token) {
      this.props.history.push("/login");
    } else{
      //token gets old info from login, needs to be updated
      
      const payload =  await jwtDecode(token);
      const { id } = payload;
      const updatedUser = await getCurrentUser(id);
      console.log(updatedUser)
      
      this.setState({
        currentUser: {
          ...updatedUser
        }
      });
      
      this.setState({ isLoading: true });
      console.log(this.state.currentUser)

    }
  }

  render() {
    const {
      currentUser,
      //    household_tasks, isLoading
    } = this.state;
    return (
      <div className="home-main">
        <h1 className="home-title">Welcome to Tasky {currentUser.username}! </h1>
        <div className="household-info">
          <UserStats />
          <Link
            to="/tasks"
          >
            <button className="tasks-btn">Tasks</button>
          </Link>
          <Link
            to="/create-task"
          >
            {currentUser.admin ? <button className="add-task">Add Task</button> : null}
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
