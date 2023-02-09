import React, { Component } from 'react';

class CompletedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  

 

  render() {
    const { tasks } = this.props;
    const { isLoading } = this.state;
    if(tasks === []) return (
      <div className="household-info">
        <h2>Finished Tasks</h2>
            <div>No tasks available</div>
      </div>
    );
    return (
      <div className="household-info">
        <h2>Completed Tasks</h2>
        {
          isLoading ?  <div>loading...</div> : tasks.map((completedTasks, i) => (
          <div className="task" key={i}>
            <p>Title: {completedTasks.title}</p>
            <p>Status: {completedTasks.status}</p>
            {completedTasks.points === 0 ? null : <p>Points: {completedTasks.points}</p>}
            {completedTasks.description === "" ? null : <p>Description: {completedTasks.description}</p>}
          </div>
        ))}
      </div>
    );
  }
}

export default CompletedTasks;
