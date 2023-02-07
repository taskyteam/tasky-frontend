import React, { Component } from 'react';
import Database from './Database';

class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  async componentDidMount() {
    const userId = this.props.userId;
    const tasks = await Database.getTasksByUser(userId);
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <h2>My Tasks</h2>
        {tasks.map(task => (
          <div key={task.id}>
            <p>Title: {task.title}</p>
            <p>Status: {task.status}</p>
            <p>Points: {task.points}</p>
            <p>Description: {task.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default MyTasks;
