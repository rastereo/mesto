export default class Card {
  constructor({ data, userId, handleCardClick, handleCardDelete, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
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

  _checkUserLike() {
    this._userLike = this._likes.some(like => {
      return like._id === this._userId;
    });
  }

  _checkUserCard() {
    return this._ownerId === this._userId;
  }

  _setEventListeners() {
    this._checkUserCard()
      ? this._deleteButton.addEventListener('click', () => this._handleCardDelete(this._cardId))
      : this._deleteButton.remove();

    this._likeButton.addEventListener('click', () => {
      this._userLike = !this._userLike;

      this._handleLikeClick(this._userLike, this._cardId);
    });

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  handleToggleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  setCountLikes(number) {
    this._likeCounter.textContent = number;
  }

  removeCard() {
    this._element.remove();

    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardDescription = this._element.querySelector('.card__description');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');

    this._cardDescription.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.setCountLikes(this._likes.length)

    this._checkUserLike()

    if (this._userLike) this.handleToggleLikeButton();

    this._setEventListeners();

    return this._element;
  }
}
