export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('/orders/user/' + userId);
    const data = await response.json();
    resolve({data});
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('/users/' + userId);
    const data = await response.json();
    resolve({data});
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/users/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type': 'application/json'},
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({data});
  });
}
