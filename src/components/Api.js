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

}

export default Api
