import React, { Component } from 'react';
import { getTasksByHousehold } from '../services/tasks';

class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const household_id = 1; //this.props.userId;

    this.setState({
      tasks: await getTasksByHousehold(household_id),
      
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
    const { tasks } = this.state;
    return (
      <div>
        <h2>Household Tasks</h2>
        {tasks.map((task, i) => (
          <div key={i}>
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
