import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);

    this._name = name;
    this._link = link;
    this._image = this._popup.querySelector('.popup__photo');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open() {
    this._image.alt = this._name;
    this._image.src = this._link;

    this._caption.textContent = this._name;

    super.open();
  }
}
