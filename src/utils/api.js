const baseUrl = 'http://localhost:3001';

function checkResponse(res) {
   return  res.ok? res.json() : Promise.reject(`Error: ${res.status}`)
}

function getItems(){
    return fetch(`${baseUrl}/items`).then(checkResponse)
}


function addItem(item, token) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item)
  })
  .then(checkResponse);
}

function deleteItem(item, token) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  .then(checkResponse);
}

function updateUserData(user, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user)
  })
  .then(checkResponse);
}

function addCardLike(id, token){
   return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}

function removeCardLike(id, token){
   return fetch(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}


export {getItems, addItem, deleteItem, updateUserData, addCardLike, removeCardLike};