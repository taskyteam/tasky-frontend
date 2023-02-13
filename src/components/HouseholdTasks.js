import React, { Component } from 'react';
import { updateTask } from '../services/tasks';

class HouseholdTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleUpdateStatus = async (id) => {
    this.setState({ isLoading: true });
    if(!id) return;

    const { tasks } = this.props;
    const task = tasks.find((task) => task.id === id);
    task.status = "completed";
    try {
      await updateTask(id, task.title, task.description, task.assigned_to, task.status, task.points );
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }

    await this.props.populateTasks();
  };

  render() {
    const { tasks } = this.props;
    if(tasks.length === 0) return (
      <div className="household-info">
        <h2>Household Tasks</h2>
            <div>No tasks available</div>
      </div>
    );
    return (
      <div className="household-info">
        <h2>Household Tasks</h2>
        {tasks.map((task, i) => (
          <div className="task" key={i} id={task.id}>
            <p>Title: {task.title}</p>
            <p>Status: {task.status}</p>
            {task.points === 0 ? null : <p>Points: {task.points}</p>}
            {task.description === "" ? null : <p>Description: {task.description}</p>}
            <p>Assigned to: {task.assigned_to}</p>
            {task.status === "open" ? null : <button onClick={() => this.handleUpdateStatus(task.id)}>Approve</button>}          </div>
        ))}
      </div>
    );
  }
}

export default HouseholdTasks;
