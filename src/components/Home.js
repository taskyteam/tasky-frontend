import { Component } from "react";
import { getCurrentUser, getTasksByHousehold } from "../services/tasks";
import UserStats from "./UserStats";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      household_tasks: [],
      household_users: [],
      currentUser_id: 2,
      currentUser_household_id: 0,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const currentUser = await getCurrentUser(this.state.currentUser_id);
      this.setState({
        currentUser: currentUser,
        currentUser_household_id: currentUser.household_id,
      });
      const household_tasks = await getTasksByHousehold(
        this.state.currentUser_household_id
      );
      this.setState({
        household_tasks: household_tasks,
        isLoading: false,
      });
      console.log(this.state.currentUser);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      currentUser,
      //    household_tasks, isLoading
    } = this.state;
    return (
      <div>
        <h1>Welcome {currentUser.username}! </h1>
        <div className="household-info">
          <UserStats />

          <Link
            to="/my-tasks"
            onClick={() => {
              window.location.href = "/my-tasks";
            }}
          >
            <button className="my-tasks-btn">My tasks</button>
          </Link>
          <Link
            to="/household-tasks"
            onClick={() => {
              window.location.href = "/household-tasks";
            }}
          >
            <button className="househould-tasks-btn">Household tasks</button>
          </Link>
          <Link
            to="/create-task"
            onClick={() => {
              window.location.href = "/create-task";
            }}
          >
            <button className="add-task">Add Task</button>
          </Link>

          {/* {isLoading ? (
            <div>loading...</div>
          ) : (
            household_tasks.map((task, i) => (
              <div className="task" key={i}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.assigned_to}</p>
                <p>{task.points} 💎</p>
              </div>
            ))
          )} */}
        </div>
      </div>
    );
  }
}

export default Home;
