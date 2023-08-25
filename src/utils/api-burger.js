
const url = 'https://norma.nomoreparties.space/api';
const token = localStorage.getItem("refreshToken")

function checkResponse(res) {  
 
    if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка:${res.status}`);
}

export function getIngredients () {
    return fetch(`${url}/ingredients`)
    .then(checkResponse)
    .catch(err => console.log(err))
}

export function postOrder (arr) {
  return fetch((`${url}/orders`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    method: 'POST',
    body : JSON.stringify({ingredients : arr})
   })
  .then(checkResponse)
  .catch(err => console.log(err))
}

export function forgotPasswordRequest (value) {
  return fetch((`${url}/password-reset`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify({value})
   })
  .then(checkResponse)
  .catch(err => console.log(err))
}

export function resetPasswordRequest (value) {
  return fetch((`${url}/password-reset/reset`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify({value})
   })
  .then(checkResponse)
  .catch(err => console.log(err))
}


export function registerUser(form) {
  return fetch((`${url}/auth/register`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify(form)
   })
  .then(checkResponse)
  .catch(err => console.log(err))
}

export function loginUser(form) {
  return fetch((`${url}/auth/login`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify(form),
    
   })
  .then(checkResponse)
  .catch(err => console.log(err))
}

export const getUser = (token) => {

  return fetch ((`${url}/auth/user`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    method: 'GET',
  }).then(checkResponse)
    .catch(err => console.log(err))
}


export const refreshTokenRequest = () => {
  return fetch(`${url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse)
  .catch(err => console.log(err))
};

export const refreshUserDataRequest = (token, form) => {
  return fetch((`${url}/auth/user`), {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    body : JSON.stringify(form)
  }) .then(checkResponse)
     .catch(res => console.log(res.message))
  
}

export const logoutRequest = () => {
  return fetch((`${url}/auth/logout`), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse)
  .catch(err => console.log(err))
  

}

