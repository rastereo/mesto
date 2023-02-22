import openPopup from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const copyTemplateCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return copyTemplateCard;
  }

  _renderPopupImage() {
    this._popupImage = document.querySelector('.popup_name_image');
    this._popupImagePhoto = this._popupImage.querySelector('.popup__photo');
    this._popupImageCaption = this._popupImage.querySelector('.popup__caption');

    this._popupImagePhoto.src = this._link;
    this._popupImagePhoto.alt = this._name;

    this._popupImageCaption.textContent = this._name;

    return this._popupImage;
  }

  _removeCard() {
    this._element.remove();
  }

  _handleToggle() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._removeCard());
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleToggle());
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._renderPopupImage();

      openPopup(this._popupImage);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__description').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    this._setEventListeners();
    return this._element;
  }
}
