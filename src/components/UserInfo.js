export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._aboutElement = document.querySelector(aboutSelector)
    this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    // this._name = this._nameElement.textContent
    // this._about = this._aboutElement.textContent
    // this._avatar = this._avatarElement.src
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      id: this._id
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name = name
    this._about = about
    this._avatar = avatar
    this._id = _id
    this._nameElement.textContent = this._name
    this._aboutElement.textContent = this._about
    this._avatarElement.src = this._avatar
  }
}
