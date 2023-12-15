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

function handleOpt(sendBody) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendBody)
  }
}

export function register(user) {
  confirmBody(user)

  return fetch(`${BASE_URL}/signup`, handleOpt(user))
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res)
    })
}