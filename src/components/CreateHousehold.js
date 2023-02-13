import React from "react";
import { createHousehold, updateUser, getCurrentUser } from "../services/tasks";
import { Link } from "react-router-dom";

class CreateHousehold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      household: {
        title: "",
      },
      isFilled: false,
    };
  }

  handleNewHousehold = async (event) => {
    event.preventDefault();
    try {
      const { title } = this.state;
      console.log("this state" + title);
      if (!title) {
        this.setState({
          isFilled: false,
        });
        alert("Please fill out all fields");
        return;
      }
      const currentUser = await getCurrentUser(2)
      const { id, username, email, } = currentUser
      console.log({currentUser})
      const newHousehold = await createHousehold(title);
      console.log({newHousehold})
      this.setState({
        household: newHousehold,
        isFilled: true,
      });
      const update = await updateUser({ 
        id,
        username,
        email,
        admin: true,
        household_id: newHousehold[0].id });
      
      console.log({update})
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    
  }

  render() {
    const isFilled = this.state.isFilled;
    if (isFilled) {
      return (
        <div>
          <h1>Household Created</h1>
          <Link to="/">
            <button type="submit">Back</button>
          </Link>
        </div>
      );
    }
    return (
      <div>
        <h1>Create Task</h1>
        <label htmlFor="title">Household Name</label>
        <input
          type="text"
          name="title"

          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <button type="submit" onClick={this.handleNewHousehold}>
          Create Household
        </button>
      </div>
    );
  }
}

export default CreateHousehold;
