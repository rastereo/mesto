export default class Card {
  constructor({ data, handleCardClick, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._cardId = data._id;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const copyTemplateCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return copyTemplateCard;
  }

  _removeCard() {
    this._element.remove();

    this._element = null;
  }

  _handleToggleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  checkUserLike(userId) {
    this.userLike = this._likes.some(like => {
      return like._id === userId;
    });
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._removeCard());
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
      this._handleToggleLikeButton();
    });
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardDescription = this._element.querySelector('.card__description');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton = this._element.querySelector('.card__like-button');
    this.likeCounter = this._element.querySelector('.card__like-counter');

    this._cardDescription.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.likeCounter.textContent = this._likes.length;

    if (this.userLike) {
      this._handleToggleLikeButton()
    }

    this._setEventListeners();

    return this._element;
  }
}
