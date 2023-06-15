const url = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {  
 
    if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка:${res.status}`);
}

export function getIngredients () {
    return fetch(`${url}/ingredients`)
    .then(checkResponse)
}

export function postOrder (arr) {
  return fetch((`${url}/orders`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body : JSON.stringify({ingredients : arr})
   })
  .then(checkResponse)
}

