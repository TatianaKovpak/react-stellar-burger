import { TForm } from "../services/types/data";

const url = 'https://norma.nomoreparties.space/api';
const token = localStorage.getItem("refreshToken")

function checkResponse(res: Response) {  

    if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка:${res.status}`);
}

export function getIngredients () {
    return fetch(`${url}/ingredients`)
    .then(checkResponse)
}

export function postOrder (arr: string[], token: string) {
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
  
}

export function forgotPasswordRequest (value: TForm) {
  return fetch((`${url}/password-reset`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify({value})
   })
  .then(checkResponse)
  
}

export function resetPasswordRequest (value: TForm) {
  return fetch((`${url}/password-reset/reset`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify({value})
   })
  .then(checkResponse)
  
}


export function registerUser(form: TForm) {
  return fetch((`${url}/auth/register`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify(form)
   })
  .then(checkResponse)
  
}

export function loginUser(form: TForm) {
  return fetch((`${url}/auth/login`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify(form),
    
   })
  .then(checkResponse)
  
}

export const getUser = (token: string) => {

  return fetch ((`${url}/auth/user`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    method: 'GET',
  }).then(checkResponse)
   
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
 
};

export const refreshUserDataRequest = (token: string, form: TForm) => {
  return fetch((`${url}/auth/user`), {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': token,
    },
    body : JSON.stringify(form)
  }) .then(checkResponse)
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
 
  

}

