import React from 'react';
import { createTask, getUsers } from '../services/tasks';



class CreateTask extends React.Component{
    //title, description, assigned_to, points, status, household_id
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            assigned_to: '',
            points: '',
            status: 'open',
            household_id: 2,
            users: []
        }
    }

    handleNewTask = async (event) => {
        event.preventDefault();
        this.setState({
            title: event.target.title.value,
            description: event.target.description.value,
            assigned_to: event.target.assigned_to.value,
            points: event.target.points.value,
        
        });

        try {
            const { title, description, assigned_to, points, status, household_id } = this.state;
            const newTask = await createTask(title, description, assigned_to, points, status, household_id );
            this.setState({
                task: newTask
            });
        } catch (error) {
            console.log(error);
        }

        //clear form
        // this.setState({
        //     title: '',
        //     description: '',
        //     assigned_to: '',
        //     status: 'open',
        //     points: '',
        // });
    }
    

    async componentDidMount() {
        try {
            const users = await getUsers(2);
            this.setState({
                users: users
            });
            console.log(this.state.users)
        } catch (error) {
            console.log(error);
        }
    }


    render(){

        return(
            <div>
                <h1>Create Task</h1>
                <form className="form" onSubmit={this.handleNewTask}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" onChange={(event) => this.setState({title: event.target.value})} />
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={(event) => this.setState({description: event.target.value})} />
                    <label htmlFor="assigned_to">Assign To</label>
                    <select name="assigned_to" onChange={(event) => this.setState({assigned_to: event.target.value})}>
                         {this.state.users.map((user) => {
                            return <option  key={user.id} value={user.id}>{user.username}</option>
                         })}
                    </select>
                    <label htmlFor="points">Points</label>
                    <input type="number" name="points" onChange={(event) => this.setState({points: event.target.value})} />
                    <button type="submit">Create Task</button>
                </form>
            </div>
        );
    }
}

export default CreateTask;