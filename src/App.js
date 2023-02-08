import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CreateTask  from '../../tasky-frontend/src/components/CreateTask';
import MyTasks from './components/MyTasks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/*   <Header path="/"/> */}
        
          <MyTasks path="/create-task" component={MyTasks} /> 

         

        
      </BrowserRouter>

    </div>
  );
}

export default App;
