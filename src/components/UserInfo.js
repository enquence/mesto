export default class UserInfo {
  constructor({ usernameInputSelector, jobInputSelector }) {
    this._usernameInput = document.querySelector(usernameInputSelector)
    this._jobInput = document.querySelector(jobInputSelector)
    this._username = this._usernameInput.value
    this._job = this._jobInput.value
  }

  getUserInfo() {
    return {
      username: this._username,
      job: this._job
    }
  }

  setUserInfo({ username, job }) {
    this._username = username
    this._job = job
    this._usernameInput.value = this._username
    this._jobInput.value = this._job
  }
}
