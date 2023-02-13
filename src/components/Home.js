import { Component } from "react";
import { getTasksByHousehold } from "../services/tasks";
import UserStats from "./UserStats";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUser: {},
  //     household_tasks: [],
  //     household_users: [],
  //     currentUser_id: 2,
  //     currentUser_household_id: 0,
  //     isLoading: false,
  //   };
  // }

  // async componentDidMount() {
  //   this.setState({ isLoading: true });
  //   try {
  //     const currentUser = await getCurrentUser(this.state.currentUser_id);
  //     this.setState({
  //       currentUser: currentUser,
  //       currentUser_household_id: currentUser.household_id,
  //     });
  //     const household_tasks = await getTasksByHousehold(
  //       this.state.currentUser_household_id
  //     );
  //     this.setState({
  //       household_tasks: household_tasks,
  //       isLoading: false,
  //     });
  //     console.log(this.state.currentUser);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
     
      const payload =  jwtDecode(token);
      this.setState({ 
        currentUser: payload
       });
      this.setState({ isLoading: true });
      
      console.log(this.state)
      //get household_id from payload
      const household_id = payload.household_id;
      try {
        const household_tasks = await getTasksByHousehold(
          household_id
              );
        console.log(household_tasks)
        this.setState({
          household_tasks: household_tasks,
          isLoading: false,
        });
        console.log(this.state.currentUser);
      } catch (error) {
        console.log(error);
      }
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
