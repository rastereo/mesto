export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  _handleTarget(evt) {
    if (evt.target.classList.contains('popup')) this.close();
  }

  open() {
    this._popup.classList.add('popup_opened');

    window.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popup.classList.remove('popup_opened');

    window.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => this._handleTarget(evt));
  }
}
