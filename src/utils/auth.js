import { authNomoreparties } from "./api";

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

export function register(user) {
  confirmBody(user)

  return authNomoreparties.post(authNomoreparties.register, user)
}

export function login(user) {
  confirmBody(user)

  return authNomoreparties.post(authNomoreparties.login, user)
    .then(({ token }) => {
      sessionStorage.setItem('token', token)

      return authNomoreparties.get(authNomoreparties.me, token)
    })
    .then(( {data: { email } }) => {
      sessionStorage.setItem('email', email)
    })
}