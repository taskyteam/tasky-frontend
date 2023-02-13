import React, { Component } from "react";
import { updateTask } from "../services/tasks";

class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }




  handleUpdateStatus = async (id) => {
    if(!id) return;
    this.setState({ isLoading: true });
    const { tasks } = this.props;
    const task = tasks.find((task) => task.id === id);
    task.status = "pending";
    try {
      await updateTask(id, task.title, task.description, task.assigned_to, task.status, task.points );
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }

    await this.props.populateTasks();
  };

  

  render() {
    const { isLoading } = this.state;
    const { tasks } = this.props;
    console.log({tasks})
    console.log("tasks")
    console.log({tasks})
    if (tasks.length === 0)
      return (
        <div className="household-info">
          <h2>My Tasks</h2>
          <div>No tasks available</div>
        </div>
      );
    return (
      <div className="household-info">
        <h2>My Tasks</h2>
        {isLoading ? <div>loading...</div> : tasks.map((task, i) => (
            <div className="task" key={i} id={task.id}>
              <p>Title: {task.title}</p>
              <p>Status: {task.status}</p>
              {task.points === 0 ? null : <p>Points: {task.points}</p>}
              {task.description === "" ? null : <p>Description: {task.description}</p>}
              <button onClick={() => this.handleUpdateStatus(task.id)}>Approve</button>

            </div>
          ))
      }
      </div>
    );
  }
}

export default MyTasks;
