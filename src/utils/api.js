class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers['Content-Type'];
  }

  do(action, endPoint, id = null) {
    const url = id
      ? this._baseUrl + endPoint + '/' + id
      : this._baseUrl + endPoint;

    return fetch(url, {
      method: action,
      headers: {
        authorization: this._authorization
      }
    })
      .then(res=> {
        if(res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}.`);
      })
  }

  send(action, endPoint, sendBody, root) {
    return fetch(this._baseUrl + endPoint, {
      method: action,
      headers: {
        authorization: this._authorization,
        "content-Type": this._contentType
      },
      body: JSON.stringify(sendBody)
    })
      .then(()=> this.do('GET', root ?? endPoint))
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1",
  headers: {
    authorization: "4f0ec2d8-0a82-401b-be94-8d93fd8bc4fc",
    "Content-Type": "application/json"
  }
})

api.me = '/web_es_07/users/me';
api.cards = '/web_es_07/cards';
api.avatar = api.me + '/avatar';
api.likes = api.cards + '/likes';

export default api