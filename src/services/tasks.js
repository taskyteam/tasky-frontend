const TASKY_API_URL = process.env.REACT_APP_TASKY_API_URL || 'http://localhost:3333';

export async function getLoginToken(email, password) {
  const response = await fetch(`${TASKY_API_URL}/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json()
  console.log(data)
  return data

}

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


export async function createTask(title, description, points, assigned_to, household_id, username) {
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
        household_id,
        username
      })
    });
    const data = await response.json();
    return data;
  }

  export async function createHousehold(name, housekey) {
    const response = await fetch(`${TASKY_API_URL}/households`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      },
      body: JSON.stringify({
        housekey,
        name
      })
    });
    const data = await response.json();
    return data;
  }

  export async function createAccount(username, email, password) {
    const response = await fetch(`${TASKY_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      },
      body: JSON.stringify({
        username,
        email,
        password
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

  export async function getHouseholdById(housekey){
    const response = await fetch(`${TASKY_API_URL}/households/serial/${housekey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      }
    });
    const data = await response.json();
    return data;
  }
  
  export async function getAllUsersInHousehold(household_id){
    const response = await fetch(`${TASKY_API_URL}/users/households/${household_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      }
    });
    const data = await response.json();
    return data;
  }

  export async function updateTask(id, title, description, assigned_to, status, points){
    const response = await fetch(`${TASKY_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      },
      body: JSON.stringify({
        id,
        title,
        description,
        assigned_to,
        status, 
        points
      })
    });
    const data = await response.json();
    return data;
  }

  export async function updateUser(id, username, email, admin, household_id){
    const response = await fetch(`${TASKY_API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      },
      body: JSON.stringify({
        id,
        username,
        email,
        admin,
        household_id
      })

    });
    const data = await response.json();
    return data;

  }


  export async function getCurrentHousehold(household_id){
    const response = await fetch(`${TASKY_API_URL}/households/${household_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'x-token': localStorage.getItem('TASKY_TOKEN')
      }
    });
    const data = await response.json();
    return data;
  }