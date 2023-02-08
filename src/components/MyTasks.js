import React, { Component } from 'react';

class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    const userId = 2; //this.props.userId;
    this.getUserTasks(userId);
  }

  getUserTasks = async (user_id) => {
    const response = await fetch(`http://localhost:3333/tasks/${user_id}`);
    const data = await response.json();
    console.log(data)
    this.setState({ tasks: data });
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
