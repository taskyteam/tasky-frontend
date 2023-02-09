import React, { Component } from 'react'; 
import { getUsers } from '../services/tasks';
class HouseholdMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    const household_id = 2; //this.props.userId;
    this.setState({
      users: await getUsers(household_id),
      isLoading: false,
    });
  }
  render() {
    const { users } = this.state;
    return (
      <div className="household-info">
        <h2>Household members</h2>
        {users.map((user, i) => (
          <div className="user" key={i}>
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default HouseholdMembers;