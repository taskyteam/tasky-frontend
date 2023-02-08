// import React from "react";
// import { createTask, getUsers } from "../services/tasks";
// import { Link } from "react-router-dom";

// class CreateTask extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       task: {},
//       users: [],
//       isFilled: false,
//     };
//   } 

//   handleNewTask = async (event) => {
//     event.preventDefault();
//     const task = {
//       title: this.state.title,
//       description: this.state.description,
//       assigned_to: this.state.assigned_to,
//       status: "open",
//       points: this.state.points,
//       household_id: 2,
//     };
//     console.log(task);
  
//     try {
//       const { title, description, assigned_to, points, status, household_id } = this.state;
//       const newTask = await createTask(
//         title,
//         description,
//         parseInt(assigned_to),
//         points,
//         status,
//         household_id
//       );
    
//       this.setState({
//         status: "open",
//         task: newTask,
//       });
//     } catch (error) {
//       console.log(error);
//     }

//     //clear form
//     // this.setState({
//     //     title: '',
//     //     description: '',
//     //     assigned_to: '',
//     //     status: 'open',
//     //     points: '',
//     // });
//   };

  


//   async componentDidMount() {
//     try {
//       const users = await getUsers(2);
//       this.setState({
//         users: users,
//       });
//       console.log(this.state.users);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h1>Create Task</h1>
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             name="title"
//             onChange={(event) => this.setState({ title: event.target.value })}
//           />
//           <label htmlFor="description">Description</label>
//           <input
//             type="text"
//             name="description"
//             onChange={(event) =>
//               this.setState({ description: event.target.value })
//             }
//           />
//           <label htmlFor="assigned_to">Assign To</label>
//           <select
//             name="assigned_to"
//             onChange={(event) =>
//               this.setState({ assigned_to: event.currentTarget.value })
//             }
//           >
//             {this.state.users.map((user, i) => {
//               return (
//                 <option key={i} value={user.id}>
//                   {user.username}
//                 </option>
//               );
//             })}
//           </select>
//           <label htmlFor="points">Points</label>
//           <input
//             type="number"
//             name="points"
//             onChange={(event) => this.setState({ points: event.target.value })}
//           />
//           {/* <Link
//             to="/home"
//             //legg till check om form er tomt
//             // onClick={() => {
//             // window.location.href = "/home";
//            //  }}
//           > */}
//             <button type="submit" onClick={this.handleNewTask}>Create Task</button>
//          {/*  </Link> */}
//           <Link
//             to="/home"
//             onClick={() => {
//               window.location.href = "/home";
//             }}
//           >
//             <button type="submit">Back</button>
//           </Link>

//       </div>
//     );
//   }
// }

// export default CreateTask;


import React from "react";
import { createTask, getUsers } from "../services/tasks";
import { Link } from "react-router-dom";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: 
      {
        title: '',
        description: '',
        assigned_to: 0,
        points: '',
        household_id: 2,
      },
      users: [],
      isFilled: false,
    };
  } 

  handleNewTask = async (event) => {
    event.preventDefault();

    try {
      const { title, description, assigned_to, points, household_id } = this.state;
      console.log("this state" + title, description, assigned_to, points, household_id)
      const newTask = await createTask(
        title,
        description,
        parseInt(assigned_to),
        points,
        household_id
      );

      this.setState({
        task: newTask,
      });
    } catch (error) {
      console.log(error);
    }

  };    
  

  
  async componentDidMount() {
    try {
      const users = await getUsers(2);
      this.setState({
        users: users,
      });
      console.log(this.state.users);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Create Task</h1>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={(event) => this.setState({ title: event.target.value })} />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" onChange={(event) => this.setState({ description: event.target.value })} />
          <label htmlFor="assigned_to">Assign To</label>
          <select name="assigned_to" onChange={(event) => this.setState({ assigned_to: event.currentTarget.value })}>
            <option value="0">Select user</option>
            {this.state.users.map((user, i) => {
              return (
                <option key={i} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>
          <label htmlFor="points">Points</label>
          <input type="number" name="points" onChange={(event) => this.setState({ points: event.target.value })} />
          {/* <Link
            to="/home"
            //legg till check om form er tomt
            // onClick={() => {
            // window.location.href = "/home";
            //  }}
          > */}
            <button type="submit" onClick={this.handleNewTask}>Create Task</button>
          {/*  </Link> */}
          <Link to="/home" onClick={() => {window.location.href = "/home";}}>
            <button type="submit">Back</button>
          </Link>
      </div>
    );
}
}

export default CreateTask;

