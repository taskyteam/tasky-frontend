import React from "react";
import { createTask, getUsers } from "../services/tasks";
import { Link } from "react-router-dom";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: "",
        description: "",
        assigned_to: 0,
        points: "",
        household_id: 2,
      },
      users: [],
      isFilled: false,
    };
  }

  handleNewTask = async (event) => {
    event.preventDefault();
    try {
      const { title, description, assigned_to, points } = this.state;
      const household_id = this.state.task.household_id;
      console.log(
        "this state" + title,
        description,
        assigned_to,
        points,
        household_id
      );
      if (!title || !description || !assigned_to || !points) {
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
        household_id
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
    const isFilled = this.state.isFilled;
    if (isFilled) {
      return (
        <div>
          <h1>Task Created</h1>
          <Link to="/">
            <button type="submit">Back</button>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <h1>Create Task</h1>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label htmlFor="description">Description</label>
        <input
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
        <button type="submit" onClick={this.handleNewTask}>
          Create Task
        </button>
        <Link
          to="/"
        >
          <button type="submit">Back</button>
        </Link>
      </div>
    );
  }
}

export default CreateTask;
