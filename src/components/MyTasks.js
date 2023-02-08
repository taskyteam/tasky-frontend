import React, { Component } from 'react';
import { getUserTasks } from '../services/tasks';

class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const userId = 2; //this.props.userId;

    this.setState({
      tasks: await getUserTasks(userId),
      isLoading: false,
    })

  }

  // getUserTasks = async (user_id) => {
  //   const response = await fetch(`http://localhost:3333/tasks/${user_id}`);
  //   const data = await response.json();
  //   console.log(data)
  //   this.setState({ tasks: data });
  // }


  render() {
    const { tasks, isLoading } = this.state;
    return (
      <div>
        <h2>My Tasks</h2>
        {isLoading ? <div>loading...</div> : tasks.map(task => (
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
