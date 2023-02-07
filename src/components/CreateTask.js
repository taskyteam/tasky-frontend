import React from 'react';
import { createTask } from '../services/tasks';

class CreateTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            task: {}
        };
    }

    handleNewTask = async (event) => {
        event.preventDefault();
        const task = {
            title: this.state.title,
            description: this.state.description,
            assigned_to: this.state.assigned_to,
            status: this.state.status,
            points: this.state.points
        };
        console.log(task)

        try {
            const newTask = await createTask(task);
            this.setState({
                task: newTask
            });
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
                    <label htmlFor="assigned_to">Assigned To</label>
                    <select name="assigned_to" onChange={(event) => this.setState({assigned_to: event.target.value})}>
                        {/* users.map((user) => {
                            <option value={user.id}>{user.username}</option>
                        }) */}
                        </select>
                    <label htmlFor="status">Status</label>
                    <input type="text" name="status" onChange={(event) => this.setState({status: event.target.value})} />
                    <label htmlFor="points">Points</label>
                    <input type="text" name="points" onChange={(event) => this.setState({points: event.target.value})} />
                    <button type="submit">Create Task</button>
                </form>
            </div>
        );
    }
}

export default CreateTask;