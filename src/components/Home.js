import { Component } from "react";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            tasks: [],
            users: [],
        }
    }
render() {
    return(
<div>
    <h1>Welcome to you</h1>
</div>
    );
}
}

export default Home;

