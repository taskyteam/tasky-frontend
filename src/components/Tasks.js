import React from "react";
import MyTasks from "./MyTasks";
import HouseholdTasks from "./HouseholdTasks";
import CompletedTasks from "./CompletedTasks";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "myTasks",
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        show: "myTasks",
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <div>
          <button onClick={() => this.setState({ show: "myTasks" })}>
            My Tasks
          </button>
          <button onClick={() => this.setState({ show: "householdTasks" })}>
            Household Tasks
          </button>
          <button onClick={() => this.setState({ show: "completedTasks" })}>
            Completed Tasks
          </button>
        </div>
        {this.state.show === "myTasks" && <MyTasks />}
        {this.state.show === "householdTasks" && <HouseholdTasks />}
        {this.state.show === "completedTasks" && <CompletedTasks />}
      </div>
    );
  }
}


export default Tasks;