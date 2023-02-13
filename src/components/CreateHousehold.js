import React from "react";
import { createHousehold, updateUser } from "../services/tasks";
import ShortUniqueId from 'short-unique-id';
import jwtDecode from "jwt-decode";


class CreateHousehold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      household: {
        title: "",
        housekey: "",
      },
      currentUser: {
        id: 0,
        username: "",
        email: "",
        admin: false,
        household_id: 0,

      },
      isFilled: false,
    };
  }

  handleNewHousehold = async (event) => {
    event.preventDefault();
    try {
      const { title } = this.state;
      const housekey = new ShortUniqueId().randomUUID(6);
      const token = localStorage.getItem("TASKY_TOKEN");
      const payload =  await jwtDecode(token);
     
      console.log("this state" + title);
      if (!title) {
        this.setState({
          isFilled: false,
        });
        alert("Please fill out all fields");
        return;
      }


      const newHousehold = await createHousehold(title, housekey);
      console.log({newHousehold})
      console.log(newHousehold[0].id)
      console.log("household id")
      const newState = ({
        currentUser: {
            ...payload,
            admin: true,
            household_id: newHousehold[0].id,
        },
        household: newHousehold,
        isFilled: true,
      })
      const { id, username, email, admin, household_id } = newState.currentUser;

      const update = await updateUser(id, username, email, admin, household_id); 
      
      this.setState(newState);
      console.log({update})
      console.log("updated user")
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    const isFilled = this.state.isFilled;
    const { history } = this.props;
    if (isFilled) {
      history.replace("/")
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
