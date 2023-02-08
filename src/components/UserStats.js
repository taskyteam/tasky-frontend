import { Component } from "react";
import { getUserTasks } from "../services/tasks";

class UserStats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
    }
  }


  async componentDidMount() {
    this.setState({
      tasks: await getUserTasks(2)
    })
  }


  render() {
    const tasks = this.state.tasks;
    const openTasks = tasks.filter(task => task.status == 'open');
    const finishedTasks = tasks.filter(task => task.status == 'finished');
    if (!tasks) {
      return
    } else {
      return (
        <div>{finishedTasks.length} out of {tasks.length} tasks complete</div>
      )

    }
  }
}

export default UserStats;