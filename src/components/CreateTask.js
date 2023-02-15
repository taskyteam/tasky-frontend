import React from "react";
import { createTask, getCurrentHousehold, getCurrentUser, getUsers } from "../services/tasks";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: "",
        description: "",
        assigned_to: 0,
        points: "",
        household_id: 0,
        username: "",
      },
      currentHousehold: {},
      currentUser: {},
      users: [],
      isFilled: false,
    };
  }

  handleNewTask = async (event) => {
    event.preventDefault();
    
    try {
      const { title, description, assigned_to, points } = this.state;
      const findAssingedUser = this.state.users.find((user) => user.id === +assigned_to);
      const username = findAssingedUser.username;
      const household_id = this.state.currentHousehold.id;
      if (!title || !assigned_to || !points) {
        this.setState({
          isFilled: false,
        });
        alert("Please fill out all fields");
        return;
      }
      const newTask = await createTask(
        title,
        description,
        +assigned_to,
        +points,
        household_id,
        username
      );

      this.setState({
        task: newTask,
        isFilled: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    const token = localStorage.getItem("TASKY_TOKEN");
    const payload = await jwtDecode(token);
    const updatedUser = await getCurrentUser(payload.id)
    const household_id = updatedUser.household_id;
    const updatedHousehold = await getCurrentHousehold(household_id);
      this.setState({
        currentHousehold: {
          ...updatedHousehold
        },
        currentUser: {
          ...updatedUser
        }
      })
    try {
      const users = await getUsers(household_id);
      this.setState({
        users: users,
      });
      console.log(this.state.users);
      console.log("users")
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const isFilled = this.state.isFilled;
    if (isFilled) {
      return (
        <div className="pageContainer">
          <h1>Task Created</h1>
          <Link to="/">
            <button type="submit">Back</button>
          </Link>
        </div>
      );
    }
    return (
        <div className="pageContainer">
          <h1>Create Task</h1>
          <div className="inputBox">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            <label htmlFor="description">Description</label>
            <textarea className="createDescription"
              type="text"
              name="description"
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
            <label htmlFor="assigned_to">Assign To</label>
            <select
              name="assigned_to"
              onChange={(event) =>
                this.setState({ assigned_to: event.currentTarget.value })
              }
            >
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
            <input
              type="number"
              name="points"
              onChange={(event) => this.setState({ points: event.target.value })}
            />
            <button className="btn-primary" type="submit" onClick={this.handleNewTask}>
              Create Task
            </button>
            <Link
              to="/"
            >
              <button className="btn-primary" type="submit">Back</button>
            </Link>
                  </div>
          </div>
    );
  }
}

export default CreateTask;
