export default class UserInfo {
  constructor({ usernameSelector, jobSelector }) {
    this._usernameElement = document.querySelector(usernameSelector)
    this._jobElement = document.querySelector(jobSelector)
  }

  getUserInfo() {
    console.log(this)
    this._username = this._usernameElement.textContent
    this._job = this._jobElement.textContent
    return {
      username: this._username,
      job: this._job
    }
  }

  setUserInfo({ username, job }) {
    this._username = username
    this._job = job
    this._usernameElement.textContent = this._username
    this._jobElement.textContent = this._job
  }
}
