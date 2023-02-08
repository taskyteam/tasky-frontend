import React from "react";
import MyTasks from "./MyTasks";
import HouseholdTasks from "./HouseholdTasks";

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
        </div>
        {this.state.show === "myTasks" ? <MyTasks /> : <HouseholdTasks />}
      </div>
    );
  }
}


export default Tasks;