import React, { Component } from 'react';

class CompletedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  

 

  render() {
    const { tasks, personalTasks, currentUserAdmin } = this.props;
    const { isLoading } = this.state;
    
    if(tasks.length === 0) return (
      <div className="household-info">
            <div>No tasks available</div>
      </div>
    );

    if(currentUserAdmin){
      return (
        <div className="household-info">
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
    return ( <div className="household-info">
    {
      isLoading ?  <div>loading...</div> : personalTasks.map((completedTasks, i) => (
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
