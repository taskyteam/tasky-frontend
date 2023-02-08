import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import CreateTask  from './components/CreateTask';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/*   <Header path="/"/> */}
        
          <CreateTask path="/create-task" component={CreateTask} />
         

        
      </BrowserRouter>

    </div>
  );
}

export default App;
