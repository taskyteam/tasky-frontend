import { Component } from "react";
import UserStats from "./UserStats";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getCurrentUser, getCurrentHousehold } from "../services/tasks";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentHousehold: {},
      household_tasks: [],
      household_users: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const token = localStorage.getItem("TASKY_TOKEN");
    if(!token) {
      this.props.history.push("/login");
    } else{
      //token gets old info from login, needs to be updated
      
      const payload =  await jwtDecode(token);
      const { id } = payload;
      const updatedUser = await getCurrentUser(id);
      const { household_id } = updatedUser;
      const updatedHousehold = await getCurrentHousehold(household_id);

      this.setState({
        currentUser: {
          ...updatedUser
        },
        currentHousehold: {
          ...updatedHousehold
        },
        isLoading: false,
      })
      console.log(household_id)
      console.log("household id")

      console.log(this.state.currentHousehold)
      console.log(this.state.currentUser)
    }
  }

  render() {
    const {
      currentUser,
      currentHousehold,
      //    household_tasks, isLoading
    } = this.state;
    return (
      <div>
        <h1 className="home-title">Welcome {currentUser.username}! </h1>
        <div className="home-main">
          <div className="household-info">
            <UserStats />
            <div className="household-name">{currentHousehold.name}</div>
            {!currentUser.Admin ? null : <div className="household-key">Household Key:{currentHousehold.housekey}</div>}          <Link
              to="/tasks"
            >
              <button className="btn-primary">Tasks</button>
            </Link>
            <Link
              to="/create-task"
            >
              {currentUser.admin ? <button className="btn-primary">Add Task</button> : null}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
