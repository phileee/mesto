export default class UserInfo {
  constructor({name, info, avatar}) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
    this._avatarSrc = avatar;
  }

  getUserInfo() {
    const userObj = {
      name: this._name.textContent,
      info: this._info.textContent,
    };
    return userObj;
  }

  setUserInfo({name, info, avatar}) {
    this._name.textContent = name;
    this._info.textContent = info;
    this._avatarSrc.src = avatar;
  }
}