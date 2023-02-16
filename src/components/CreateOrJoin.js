import React from 'react';
import { getHouseholdById, updateUser } from '../services/tasks';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import houseImage from "../images/house.svg"
import castleImage from "../images/castle.svg"



class CreateOrJoin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            create: false,
            join: false,
            housekeyInput: '',
            household: {},
            currentUser: {},
        }
    }

    handleHousekey = (event) => {
        this.setState({
            housekeyInput: event.target.value
        })
    }

    handleGetHousehold = async () => {
        const token = localStorage.getItem("TASKY_TOKEN")
        if(!token){
            this.props.history.push("/login")
        }else{
         const payload = jwtDecode(token)
        try{
            const household = await getHouseholdById(this.state.housekeyInput)  
            this.setState({
                household: household
            })
            const newState = ({
                currentUser: {
                    ...payload,
                    admin: false,
                    household_id: household.id,
                },
                household: household,
                isFilled: true,
              })
              const { id, username, email, admin, household_id } = newState.currentUser;
        
              const update = await updateUser(id, username, email, admin, household_id); 
              console.log({update})
              

            this.props.history.replace("/")
        }catch(error){
            console.log(error)
        }
    }
}

    handleRedirectToCreate = () => {
        this.props.history.replace("/create-household")
    }

    render(){
        return(
            <div className="pageContainer">
                <div className="create-household">
                    <Link to="/create-household">
                        <img src={castleImage} alt="castle"/>
                        <h1>Create Household</h1>
                        <button 
                    className="btn-primary"
                    >Create</button>
                    </Link>
                </div>
                <div className="join-household">
                    <div className="illustration-house">
                        <img src={houseImage} alt="house"/>
                    </div>
                    <h1>Join Household</h1>
                    <input type="text" placeholder="Enter Household Code" className="household-code" onChange={this.handleHousekey}/>
                    <button 
                    className="btn-primary"
                    onClick={this.handleGetHousehold}>Join</button>
                </div>
            </div>
        )
    }
}

export default CreateOrJoin