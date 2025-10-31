import checkResponse from "./api";

const baseUrl = 'http://localhost:3001';


function signIn({email, password}){
    return  fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password})
  })
  .then(checkResponse);
}

function signUp({name, avatar, email, password}){
    return  fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, avatar, email, password})
  })
  .then(checkResponse);
}

function getUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
       authorization: `Bearer ${token}`,
    },
  })
  .then(checkResponse);
}

export {signIn, signUp, getUser}