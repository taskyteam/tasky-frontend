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
    console.log(` id is ${id} `)
    const { tasks } = this.props;
    const task = tasks.find((task) => task.id === id);
    console.log({task})
    const updatedTask = await updateTask(id, {
      ...task,
      status: "pending",
    });
    console.log({updatedTask})
    await this.props.populateTasks();
  };

  

  render() {
    const { isLoading } = this.state;
    const { tasks } = this.props;
    console.log("tasks")
    console.log({tasks})
    if (!tasks)
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
