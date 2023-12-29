const BASE_URL = "https://register.nomoreparties.co";

function confirmBody(user) {
  if (typeof user !== 'object') {
    throw new Error('Pass an object')
  }

  if (!user.password) {
    throw new Error('Missed password')
  }

  if (!user.email) {
    throw new Error('Missed email')
  }

  if (Object.keys(user).length !== 2) {
    throw new Error('There\'re more elements needed')
  }
}

function setPostOpt(sendBody) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendBody)
  }
}

function handleResponse(res) {
  if (res.ok) return res.json()
  return Promise.reject(res)
}

export function register(user) {
  confirmBody(user)

  return fetch(`${BASE_URL}/signup`, setPostOpt(user))
    .then(handleResponse)
}

export function login(user) {
  confirmBody(user)

  return fetch(`${BASE_URL}/signin`, setPostOpt(user))
    .then(handleResponse)
    .then(({ token }) => {
      sessionStorage.setItem('token', token)

      return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })
    })
    .then(handleResponse)
    .then(( {data: { email } }) => {
      sessionStorage.setItem('email', email)
    })
}