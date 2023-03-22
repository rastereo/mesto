export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserId(id) {
    this.id = id;
  }

  getUserInfo() {
    this._userInfoValues = {}

    this._userInfoValues['name'] = this._name.textContent;
    this._userInfoValues['job'] = this._job.textContent;

    return this._userInfoValues;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar({ name, avatar }) {
    this._avatar.src = avatar;
    this._avatar.alt = `Аватар ${name}`;
  }
}
