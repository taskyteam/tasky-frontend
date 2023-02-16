import { Component } from "react";
import { getUserTasks, getUserGoals } from "../services/tasks";
import jwtDecode from "jwt-decode";

class UserStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      goals: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const token = localStorage.getItem("TASKY_TOKEN");
    const payload = await jwtDecode(token);
    this.setState({
      tasks: await getUserTasks(payload.id),
      goals: await getUserGoals(payload.id),
    });
    this.setState({ isLoading: false });
  }

  render() {

    const tasks = this.state.tasks;
    const goals = this.state.goals;
    const { isLoading } = this.state;
    //const openTasks = tasks.filter(task => task.status === 'open');
    const completedTasks = tasks.filter((task) => task.status === "completed");
    const goalPoints = goals.reduce((acc, goal) => acc + goal.points, 0);
    const goalTitle = goals.map((goal) => goal.title);
    let points = 0;
    completedTasks.forEach((task) => (points += task.points));
    points = 5636;
    const percentageOfGoal = Math.round((points / goalPoints) * 100);
    const percentageOfTasks =
      Math.round((completedTasks.length / tasks.length) * 100) || 49;

    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return (
      <div className="statsContainer">
        {goals.length !== 0 ? (
          <div className="goalStats">
            <div className="circleContainer">
              <svg viewBox="0 0 36 36" className="circular-chart">
              <defs>
                  <filter id="inset-shadow">
                    <feFlood floodColor="black" />
                    <feComposite operator="xor" in2="SourceGraphic" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite
                      operator="in"
                      in2="SourceGraphic"
                      result="map"
                    />
                    <feDiffuseLighting
                      lightingColor="white"
                      surfaceScale="2"
                      diffuseConstant="1"
                    >
                      <feSpotLight x="-30" y="-30" z="230" />
                    </feDiffuseLighting>
                    <feBlend mode="multiply" in="SourceGraphic" />
                    <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                </defs>
                <circle
                  filter="url(#inset-shadow)"
                  className="circle-bg"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
                <path
                  className="circle"
                  strokeDasharray={`${percentageOfGoal}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <p className="percentage">{percentageOfGoal}%</p>
            </div>
            <div>{goalTitle}</div>
            <div>
              {points} / {goalPoints} 
            </div>
          </div>
        ) : null}
        {percentageOfTasks ? (
          <div className="goalStats">
            <div className="circleContainer">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <defs>
                  <filter id="inset-shadow">
                    <feFlood flood-color="black" />
                    <feComposite operator="xor" in2="SourceGraphic" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite
                      operator="in"
                      in2="SourceGraphic"
                      result="map"
                    />
                    <feDiffuseLighting
                      lightingColor="white"
                      surfaceScale="2"
                      diffuseConstant="1"
                    >
                      <feSpotLight x="-30" y="-30" z="230" />
                    </feDiffuseLighting>
                    <feBlend mode="multiply" in="SourceGraphic" />
                    <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                </defs>
                <circle
                  filter="url(#inset-shadow)"
                  className="circle-bg"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
                <path
                  className="circle"
                  strokeDasharray={`${percentageOfTasks}, 100`}
                  strokeLinecap="round"
                  d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <p className="percentage">{percentageOfTasks}%</p>
            </div>
            <div>
              {completedTasks.length} out of {tasks.length} tasks done! 👍
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default UserStats;
