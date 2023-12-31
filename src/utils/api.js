class Api {
  _get = 'GET'
  _post = 'POST'
  _delete = 'DELETE'
  _put = 'PUT'
  _patch = 'PATCH'

  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers['Content-Type'];
  }

  _confirm(res) {
    if(res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}.`);
  }

  _setEndPoints(endPoints) {
    Object.entries(endPoints).forEach(([key, value]) => {
      this[key] = value
    })
  }
}

class ApiEstablished extends Api {
  constructor(config, endPoints) {
    super(config)
    this._setEndPoints(endPoints)
  }

  _sendBodyOptions({ method, body }) {
    return {
      method,
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify(body)
    }
  }

  _sendBody(endPoint, fetchOpt, root) {
    return fetch(this._baseUrl + endPoint, this._sendBodyOptions(fetchOpt))
    .then(this._confirm)
    .then(() => this.get(root ?? endPoint))
  }

  get = (endPoint) => {
    return fetch(this._baseUrl + endPoint, {
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._confirm)
  }

  toggle = (condition, endPoint, id) => {
    return fetch(this._baseUrl + endPoint + '/' + id, {
      method: condition ? this._delete : this._put,
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._confirm)
  }

  remove = (endPoint, id) => {
    return fetch(this._baseUrl + endPoint + '/' + id, {
      method: this._delete,
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._confirm)
  }

  patch = (endPoint, body, root = null) => {
    return this._sendBody(endPoint, { method: this._patch, body }, root)
  }

  post = (endPoint, body, root = null) => {
    return this._sendBody(endPoint, { method: this._post, body }, root)
  }
}

class ApiAuth extends Api {
  constructor(config, endPoints) {
    super(config)
    this._setEndPoints(endPoints)
  }

  post = (endPoint, body) => {
    return fetch(this._baseUrl + endPoint, {
      method: this._post,
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify(body)
    })
    .then(this._confirm)
  }

  get = (endPoint, token) => {
    return fetch(this._baseUrl + endPoint, {
      method: this._get,
      headers: {
        "Content-Type": this._contentType,
        "Authorization": `Bearer ${token}`
      }
    })
    .then(this._confirm)
  }
}

const authNomoreparties = new ApiAuth({
  baseUrl: "https://register.nomoreparties.co",
  headers: {
    "Content-Type": "application/json"
  }
}, {
  register: '/signup',
  login: '/signin',
  me: '/users/me',
});

const aroundNomoreparties = new ApiEstablished({
  baseUrl: "https://around.nomoreparties.co/v1",
  headers: {
    authorization: "4f0ec2d8-0a82-401b-be94-8d93fd8bc4fc",
    "Content-Type": "application/json"
  }
}, {
  me: '/web_es_07/users/me',
  cards: '/web_es_07/cards',
  avatar: '/web_es_07/users/me/avatar',
  likes: '/web_es_07/cards/likes',
})

export { authNomoreparties, aroundNomoreparties }