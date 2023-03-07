import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    const image = this._popup.querySelector('.popup__photo');
    const caption = this._popup.querySelector('.popup__caption');

    image.alt = this._name;
    image.src = this._link;

    caption.textContent = this._name;

    super.open();
  }
}
