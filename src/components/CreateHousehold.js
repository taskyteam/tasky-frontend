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
      <div className="pageContainer">
        <div className="inputBox">
          <h1>Create Household</h1>
          <input
            type="text"
            name="title"
            placeholder="Household Name"
            onChange={(event) => this.setState({ title: event.target.value })}
          />
          <button className="btn-primary" type="submit" onClick={this.handleNewHousehold}>
            Create Household
          </button>
        </div>
      </div>
    );
  }
}

export default CreateHousehold;
