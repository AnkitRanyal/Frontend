export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/orders/?user=' + userid)
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/users/' + userId)
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/users/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}