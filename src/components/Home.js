import { Component } from "react";
import UserStats from "./UserStats";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getCurrentUser, getCurrentHousehold } from "../services/tasks";
import logo from "../images/logo.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentHousehold: {},
      household_tasks: [],
      household_users: [],
      isLoading: false,
      goal: {},
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
      // console.log(household_id)
      // console.log("household id")

      // console.log(this.state.currentHousehold)
      // console.log(this.state.currentUser)
    }
  }

  render() {
    const {
      currentUser,
      currentHousehold,
      isLoading
      //    household_tasks, isLoading
    } = this.state;
    console.log(currentUser)
    console.log("current user in Home")
    if(isLoading) return <div className="household-info"><p>Loading...</p></div>
    return (
      <div>
        <h1>Welcome {currentUser.username}! </h1>
        <p className="household-name">{currentHousehold.name}</p>
            {currentUser.admin ? <p className="household-key">House key: {currentHousehold.housekey}</p> : null}          
        <div style={{transition: "3s ease-in all"}}>
          
          <div className="household-info">
            <UserStats isLoading={isLoading} />
            <Link
              to="/tasks"
            >
              <button className="btn-primary">Tasks</button>
            </Link>
            <Link
              to="/create-task"
            >
              {currentUser.admin ? <button className="btn-primary">Add Task</button> : null}
            </Link>
            <Link
              to="/create-goal"
            >
              {currentUser.admin ? <button className="btn-primary">Add goal</button> : null}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
