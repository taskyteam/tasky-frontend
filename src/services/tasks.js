const TASKY_API_URL = process.env.REACT_APP_TASKY_API_URL || 'http://localhost:3333';

export async function getCurrentUser(user_id) {
  const response = await fetch(`${TASKY_API_URL}/currentuser/${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'x-token': localStorage.getItem('TASKY_TOKEN')
    }
  });
  const data = await response.json();
  return data;
}


export async function createTask(title, description, points, assigned_to, household_id) {
    const response = await fetch(`${TASKY_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      },
      body: JSON.stringify({
        title,
        description,
        points,
        assigned_to,
        household_id
      })
    });
    const data = await response.json();
    return data;
  }

  

  export async function getUserTasks(user_id) {
    let response = await fetch(`${TASKY_API_URL}/tasks/${user_id}`);
    let data = await response.json();
    console.log(data)
    return data;
  }

  export async function getUsers(household_id) {
    const response = await fetch(`${TASKY_API_URL}/tasks/users/${household_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      }
    });
    const data = await response.json();

    return data;
  }

  export async function getTasksByHousehold(household_id){
    const response = await fetch(`${TASKY_API_URL}/tasks/households/${household_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      }
    });
    const data = await response.json();
    return data;

  }