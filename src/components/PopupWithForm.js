import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {

    this._inputValues.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close() {
    this._form.reset();

    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._inputValues = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()

      this._handleFormSubmit(this._getInputValues());
    });
  }
}
