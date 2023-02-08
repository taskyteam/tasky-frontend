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
    //const openTasks = tasks.filter(task => task.status === 'open');
    const completedTasks = tasks.filter(task => task.status === 'completed');
    let points = 0;
    completedTasks.forEach(task => points += task.points);
    
    if (!tasks) {
      return
    } else {
      return (
        <>
        <div>{completedTasks.length} out of {tasks.length} tasks done! 👍</div>
        <div>{points} points earned 😃</div>
        
        </>
      )

    }
  }
}

export default UserStats;