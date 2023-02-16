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
        <h2>Finished Tasks</h2>
            <div>No tasks available</div>
      </div>
    );

    if(currentUserAdmin){
      return (
        <div className="household-info">
          <h2>Completed Tasks</h2>
          {
            isLoading ?  <div>loading...</div> : tasks.map((completedTasks, i) => (
            <div className="task" key={i}>
              <p style={{fontSize: "1.5rem"}}> {completedTasks.title}</p>
              {completedTasks.points === 0 ? null : <p>Points: {completedTasks.points}</p>}
              {completedTasks.description === "" ? null : <p> {completedTasks.description}</p>}
              <p style={{color: "gray"}}>{completedTasks.username}  </p>

            </div>
          ))}
        </div>
      );
    }
    return ( <div className="household-info">
    <h2>Completed Tasks</h2>
    {
      isLoading ?  <div>loading...</div> : personalTasks.map((completedTasks, i) => (
      <div className="task" key={i}>
        <p style={{fontSize: "1.5rem"}}>{completedTasks.title}</p>
        {completedTasks.points === 0 ? null : <p>Points: {completedTasks.points}</p>}
        {completedTasks.description === "" ? null : <p> {completedTasks.description}</p>}

      </div>
    ))}
  </div>
);
    
  }
}

export default CompletedTasks;
