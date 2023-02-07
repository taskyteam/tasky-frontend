const TASKY_API_URL = process.env.REACT_APP_TASKY_API_URL || 'http://localhost:3333';


export async function createTask(obj) {
    const response = await fetch(`${TASKY_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('TASKY_TOKEN')
      },
      body: JSON.stringify({
        obj
      })
    });
    const data = await response.json();
    return data;
  }