import React from "react";
import MyTasks from "./MyTasks";
import HouseholdTasks from "./HouseholdTasks";
import CompletedTasks from "./CompletedTasks";
import { Switch, Route } from "react-router-dom";
import { getCurrentUser, getTasksByHousehold, getAllUsersInHousehold } from "../services/tasks";
import jwtDecode from "jwt-decode";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
      household_id: 0,
      currentUser: {
        id: 0,
        username: "",
        email: "",
        admin: false,
        household_id: 0,
      },
      householdUsers: [],
    };
  }

 populateTasks = async (household_id) => {
    this.setState({ isLoading: true });
    try{
      this.setState({
        tasks: await getTasksByHousehold(household_id),
        householdUsers: await getAllUsersInHousehold(household_id),
        isLoading: false,
      })
      console.log("populated tasks")
    }catch(error){
      console.log(error);
    }
    console.log("populated tasks")
    console.log({tasks: this.state.tasks})
    console.log({householdUsers: this.state.householdUsers})
  }


  async componentDidMount() {
    const token = localStorage.getItem("TASKY_TOKEN");
    const payload = await jwtDecode(token);
    const updatedUser = await getCurrentUser(payload.id);
    const { household_id } = updatedUser;

    this.setState({
      currentUser: {
        ...updatedUser,
      },
      household_id: household_id,
    });
    console.log({payload})
    console.log("payload from Tasks.js")
    await this.populateTasks(household_id);
    console.log("mounted")
  }

 
  render() {

    const { tasks, currentUser } = this.state;
    const { household_id, id } = this.state.currentUser
    console.log({tasks})  
    const myTasks = tasks.filter((task) => task.assigned_to === id && task.status === "open");
    const householdTasks = tasks.filter( (task) => task.household_id === household_id && (task.status === "open" || task.status === "pending"));
    const completedTasks = tasks.filter( (task) => task.status === "completed");
    const personalCompletedTasks = tasks.filter( (task) => task.assigned_to === id && task.status === "completed");
    console.log({myTasks, householdTasks, completedTasks})
    const currentUserAdmin = currentUser.admin;
    return (
      <div className="pageContainer">
        <div className="task-btn-nav">
          <button className="btn-primary" onClick={() => this.props.history.push(`${this.props.match.url}`)}>
            My Tasks
          </button>
          {currentUser.admin ? <button className="btn-primary" onClick={() => this.props.history.push(`${this.props.match.url}/householdtasks`)}>
            Household Tasks
          </button> : null}
          <button className="btn-primary" onClick={() => this.props.history.push(`${this.props.match.url}/completedtasks`)}>
            Completed Tasks
          </button>
        </div>
        
        <Switch>
          <Route exact path={`${this.props.match.path}/`} render={routeProps => <MyTasks {...routeProps} tasks={myTasks} populateTasks={() => this.populateTasks(household_id)}  />} />
          <Route exact path={`${this.props.match.path}/householdtasks`} render={routeProps => <HouseholdTasks {...routeProps} tasks={householdTasks} populateTasks={() => this.populateTasks(household_id)}/>} />
          <Route exact path={`${this.props.match.path}/completedtasks`} render={routeProps => <CompletedTasks {...routeProps} tasks={completedTasks} personalTasks={personalCompletedTasks} currentUserAdmin={currentUserAdmin} populateTasks={() => this.populateTasks(household_id)} />} />
        </Switch>
      </div>
    );
  }
}


export default Tasks;