import React from "react";
import MyTasks from "./MyTasks";
import HouseholdTasks from "./HouseholdTasks";
import CompletedTasks from "./CompletedTasks";
import { Switch, Route } from "react-router-dom";
import { getTasksByHousehold, updateTask } from "../services/tasks";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
      noTasks: false,
      show: "myTasks",
      household_id: 1,
      currentUser: 2,
    };
  }


  async componentDidMount() {
    this.setState({ isLoading: true });
    const household_id = 1;
    try{
      this.setState({
        tasks: await getTasksByHousehold(household_id),
        isLoading: false,
      })
    }catch(error){
      console.log(error);
    }
    // if(this.state.tasks.length === 0){
    //   this.setState({
    //     noTasks: true,
    //   })
    // }
  }


  render() {
    const { tasks, 
      /* isLoading, noTasks,  */
      currentUser, household_id } = this.state;
    const myTasks = tasks.filter((task) => task.user_id === currentUser || task.status === "open");
    const householdTasks = tasks.filter( (task) => task.household_id === household_id || task.status === "open" || task.status === "pending");
    const completedTasks = tasks.filter( (task) => task.status === "completed");
    console.log({myTasks, householdTasks, completedTasks})
    return (
      <div>
        <h1>Tasks {this.props.match.path}</h1>
        <div>
          <button onClick={() => this.props.history.push(`${this.props.match.url}`)}>
            My Tasks
          </button>
          <button onClick={() => this.props.history.push(`${this.props.match.url}/householdtasks`)}>
            Household Tasks
          </button>
          <button onClick={() => this.props.history.push(`${this.props.match.url}/completedtasks`)}>
            Completed Tasks
          </button>
        </div>
        {/* {this.state.show === "myTasks" && <MyTasks />}
        {this.state.show === "householdTasks" && <HouseholdTasks />}
        {this.state.show === "completedTasks" && <CompletedTasks />} */}
        <Switch>
          <Route exact path={`${this.props.match.path}/`} render={routeProps => <MyTasks {...routeProps}/>} />
          <Route  path={`${this.props.match.path}/householdtasks`} component={HouseholdTasks} />
          <Route  path={`${this.props.match.path}/completedtasks`} component={CompletedTasks} />
        </Switch>
      </div>
    );
  }
}


export default Tasks;