export default class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка из getUserInfo: ${res.status} ${res.statusText}`);
      });
  }

  patchUserInfo(name, job) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(`Ошибка из patchUserInfo: ${res.status} ${res.statusText}`)
      });
  }

  patchAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка из patchAvatar: ${res.status} ${res.statusText}`);
      });
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка из getInitialCards: ${res.status} ${res.statusText}`);
      });
  }

  postCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка из postCard: ${res.status} ${res.statusText}`);
      });
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка из deleteCard: ${res.status} ${res.statusText}`);
      });
  }

  putLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка из putLike: ${res.status} ${res.statusText}`);
      });
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка из putLike: ${res.status} ${res.statusText}`);
      });
  }
}
