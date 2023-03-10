export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
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
}
