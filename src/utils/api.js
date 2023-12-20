class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers['Content-Type'];
  }

  me = '/web_es_07/users/me';
  cards = '/web_es_07/cards';
  avatar = this.me + '/avatar';
  likes = this.cards + '/likes';

  do(method, endPoint, id = null) {
    const url = id
      ? this._baseUrl + endPoint + '/' + id
      : this._baseUrl + endPoint;

    return fetch(url, {
      method,
      headers: {
        authorization: this._authorization
      }
    })
      .then(res=> {
        if(res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}.`);
      })
  }

  send(method, endPoint, sendBody, root) {
    return fetch(this._baseUrl + endPoint, {
      method,
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

export default api