class Api {
  constructor({ url, headers}) {
    this._url = url
    this._headers = headers
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((resp) => {
        if (resp.ok) return resp.json()
        throw new Error(`Ошибка: ${resp.statusText}`)
      })
      .catch((error) => console.log(error))
  }

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  updateUserInfo({ name, about }) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  updateAvatar({ avatar }) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

}

export default Api
