import React from "react";
import { createGoal, getCurrentHousehold, getCurrentUser, getUsers } from "../services/tasks";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: "",
        assigned_to: 0,
        points: "",
        household_id: 0,
        username: "",
      },
      currentHousehold: {},
      currentUser: {},
      users: [],
      isFilled: false,
      goal: {
        title: "",
        assigned_to: 0,
        points: "",
        household_id: 0
      },
    };
  }

  handleNewTask = async (event) => {
    event.preventDefault();
    
    try {
      const { title, assigned_to, points } = this.state;
      const household_id = this.state.currentHousehold.id;
      if (!title || !assigned_to || !points) {
        this.setState({
          isFilled: false,
        });
        alert("Please fill out all fields");
        return;
      }
      const newGoal = await createGoal(
        title,
        +assigned_to,
        +points,
        household_id,
      );

      this.setState({
        goal: newGoal,
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
          <h1>Goal Created</h1>
          <Link to="/">
            <button className="btn-primary" type="submit">Back</button>
          </Link>
        </div>
      );
    }
    return (
        <div className="pageContainer">
          <h1>Create Goal</h1>
          <div className="inputBox">
            
            <input
            placeholder="Title"
              type="text"
              name="title"
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            
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
           
            <input
            placeholder="Points"
              type="number"
              name="points"
              onChange={(event) => this.setState({ points: event.target.value })}
            />
            <button className="btn-primary" type="submit" onClick={this.handleNewTask}>
              Create Goal
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
