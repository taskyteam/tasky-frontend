import React, { Component } from 'react';
import { getUserTasks } from '../services/tasks';

class CompletedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: false,
      noTasks: true,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const userId = 2; //this.props.userId;
    const tasks = await getUserTasks(userId);
    const complatedTasks = tasks.filter(task => task.status === 'completed');
    this.setState({
      tasks: complatedTasks,
      isLoading: false,
      
    })
    if(complatedTasks.length > 0) {
      this.setState({noTasks: false})
    }

  }

  render() {
    const { tasks, isLoading, noTasks } = this.state;
    if(noTasks) return (
      <div className="household-info">
        <h2>Finished Tasks</h2>
            <div>No tasks</div>
      </div>
    );
    return (
      <div className="household-info">
        <h2>Completed Tasks</h2>
        {
          isLoading && noTasks? <div>loading...</div> : tasks.map((complatedTasks, i) => (
          <div className="task" key={i}>
            <p>Title: {complatedTasks.title}</p>
            <p>Status: {complatedTasks.status}</p>
            <p>Points: {complatedTasks.points}</p>
            <p>Description: {complatedTasks.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default CompletedTasks;
